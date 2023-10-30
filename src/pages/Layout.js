import { Outlet } from "react-router-dom";
import Nav from '../components/Nav';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Layout() {

    return (
        <div>
            <Nav />
            <div className="flex">
                <Sidebar />
                <div className="w-full mx-auto overflow-x-hidden lg:w-4/5">
                    {/* An <Outlet> renders whatever child route is currently active in App.js */}
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </div >
    );
}

export default Layout;