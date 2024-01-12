import { Outlet } from "react-router-dom";
import Nav from '../components/Nav';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Layout() {

    return (
        <div>
            <Nav />
            <div className="flex">
                <Sidebar />
                <div className="w-full h-[100%] overflow-x-hidden mx-auto lg:w-4/5">
                    {/* An <Outlet> renders whatever child route is currently active in App.js */}
                    <Outlet />
                    <Footer />
                </div>
            </div>
            <ToastContainer newestOnTo transition={Zoom} />
        </div >
    );
}

export default Layout;