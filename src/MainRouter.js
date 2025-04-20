import { useEffect } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Manga from "./pages/Manga";
import Search from "./pages/Search";
import MangaOverview from "./pages/MangaOverview";
import MangaChapter from "./pages/MangaChapter";
import MangaChapters from "./pages/MangaChapters";
import { useLocation, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Auth/AuthProvider';
import { ReadingListProvider } from './context/ReadingListContext';
import ProtectedRoute from './Auth/ProtectedRoute';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyList from "./pages/MyList";
import LatestChapters from "./pages/LatestChapters";
import MangaArt from "./pages/MangaArt";


function MainRouter() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <ReadingListProvider>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/latest-chapters" element={<LatestChapters />} />

            <Route path="/manga/:id" element={<Manga />}>
              <Route path="/manga/:id/overview" element={<MangaOverview />} />
              <Route path="/manga/:id/chapters" element={<MangaChapters />} />
              <Route
                path="/manga/:id/chapter/:chapterId/:chapterNum/:lang"
                element={<MangaChapter />}
              />
              <Route
                path="/manga/:id/manga-art"
                element={<MangaArt />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </ReadingListProvider>
    </AuthProvider>
  );
}

export default MainRouter;
