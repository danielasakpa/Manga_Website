import { Outlet } from "react-router-dom";
import Nav from '../components/Nav/Nav';
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

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
        </div >
    );
}

export default Layout;