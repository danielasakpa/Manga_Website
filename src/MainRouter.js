import { useEffect } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Manga from "./pages/Manga";
import Search from "./pages/Search";
import MangaOverview from "./pages/MangaOverview";
import MangaChapter from "./pages/MangaChapter";
import MangaChapters from "./pages/MangaChapters";
import Recommendations from "./pages/Recommendations";
import { useLocation, Routes, Route } from "react-router-dom";
import { AuthProvider } from './Auth/AuthProvider';
import ProtectedRoute from './Auth/ProtectedRoute';
import Protected from './pages/Protected';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyList from "./pages/MyList";


function MainRouter() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my-list" element={<MyList />} />

          <Route path="/manga/:id" element={<Manga />}>
            <Route path="/manga/:id/overview" element={<MangaOverview />} />
            <Route path="/manga/:id/chapters" element={<MangaChapters />} />
            <Route
              path="/manga/:id/recommendations"
              element={<Recommendations />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<Protected />} />
            <Route
              path="/manga/:id/chapter/:chapterId"
              element={<MangaChapter />}
            />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>

    </AuthProvider>
  );
}

export default MainRouter;
