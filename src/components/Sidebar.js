import React from 'react';
import {
    HomeIcon,
    BookmarkSquareIcon,
    UserCircleIcon,
    MagnifyingGlassCircleIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';

const menuItems = [
    { icon: <HomeIcon className="w-6 h-6" />, label: 'Home', link: '/' },
    { icon: <MagnifyingGlassCircleIcon className="w-6 h-6" />, label: 'Discover Comics', link: '/search' },
    // { icon: <BellAlertIcon className="w-6 h-6" />, label: 'Notifications', badge: '14', link: '#' },
];

const generalItems = [
    { icon: <UserCircleIcon className="w-6 h-6" />, label: 'Profile', link: '/profile' },
    { icon: <BookmarkSquareIcon className="w-6 h-6" />, label: 'My List', link: '/my-list' },
    { icon: < ArrowLeftOnRectangleIcon className="w-6 h-6" />, label: 'Log Out', link: '#' },
];

function Sidebar() {

    const { logout } = useAuth();

    return (
        <aside className=" sticky top-[80px] h-[calc(100vh-80px)] hidden lg:block overflow-y-auto p-5 w-1/5 p-4 shadow-xl text-white text-left bg-[#1B6FA8]">
            <div className="mt-10">
                <div className="pb-3 mb-2">
                    <h5 className="text-Light-Ice-Blue font-light text-[17px]">Menu -</h5>
                </div>
                <div className="pl-2 space-y-6">
                    {menuItems.map((item, index) => (
                        <Link to={item.link} key={index} className="link-item flex items-center space-x-2 py-2 px-2 rounded-md cursor-pointer hover:text-white">
                            <span className='z-20'>{item.icon}</span>
                            <span className='lg:text-[15px] text-[17px] z-20'>{item.label}</span>
                        </Link>

                    ))}
                </div>
            </div>
            <div className="mt-10">
                <div className="pb-3 mb-2">
                    <h5 className="text-Light-Ice-Blue font-light text-[17px]">General -</h5>
                </div>
                <div className="pl-2 space-y-6">
                    {generalItems.map((item, index) => (
                        <Link
                            to={item.label === "Log Out" ? "/login" : item.link}
                            key={index}
                            onClick={item.label === "Log Out" && logout}
                            className="link-item flex items-center space-x-2 py-2 px-2 rounded-md cursor-pointer hover:text-white">
                            <span className='z-20'>{item.icon}</span>
                            <span className='g:text-[15px] text-[17px] z-20'>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
