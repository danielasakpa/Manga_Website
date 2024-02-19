import { Outlet } from "react-router-dom";
import Nav from '../components/Nav/Nav';
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { ToastContainer, Zoom } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Layout() {

    return (
        <div>
            <Nav />
            <div className="flex">
                <Sidebar />
                <div className="w-full h-[100%] overflow-x-hidden mx-auto lg:w-4/5">
                    <Outlet />
                    <Footer />
                </div>
            </div>
            <ToastContainer newestOnTop />
        </div >
    );
}

export default Layout;