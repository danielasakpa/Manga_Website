import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";
// import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { AnimatePresence } from "framer-motion";

function Layout() {
  return (
    <AnimatePresence>
      <div className="w-full h-[100vh] overflow-x-hidden overflow-y-scroll mx-auto ">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default Layout;
