import React from 'react';
import {
    HomeIcon,
    BookOpenIcon,
    UserCircleIcon,
    MagnifyingGlassCircleIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';

const menuItems = [
    { icon: <HomeIcon className="z-20 w-7 h-7" />, label: 'Home', link: '/' },
    { icon: <MagnifyingGlassCircleIcon className="z-20 w-7 h-7" />, label: 'Discover', link: '/search' },
    // { icon: <BellAlertIcon className="w-7 h-7" />, label: 'Notifications', badge: '14', link: '#' },
];

const generalItems = [
    { icon: <UserCircleIcon className="z-20 w-7 h-7" />, label: 'Profile', link: '/profile' },
    { icon: <BookOpenIcon className="z-20 w-7 h-7" />, label: 'My List', link: '/my-list' },
];



const logoutButton = { icon: < ArrowLeftOnRectangleIcon className="w-7 h-7" />, label: 'Log Out', link: '#' };


function Sidebar() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <aside className=" sticky top-[80px] h-[calc(100vh-80px)] hidden lg:block overflow-y-auto p-5 w-1/5 p-4 shadow-xl text-white text-left bg-[#1B6FA8]">
            <div className="mt-10">
                <div className="pb-3 mb-2">
                    <h5 className="text-Light-Ice-Blue font-light text-[20px]">Menu -</h5>
                </div>
                <div className="pl-2 space-y-6">
                    {menuItems.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            className="link-item px-2 py-2 gap-2 rounded-md cursor-pointer hover:text-white">
                            {item.icon}
                            <span className='text-[17px] z-20'>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <div className="pb-3 mb-2">
                    <h5 className="text-Light-Ice-Blue font-light text-[20px]">General -</h5>
                </div>
                <div className="pl-2 space-y-6">
                    {generalItems.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            className="link-item px-2 py-2 gap-2 rounded-md cursor-pointer hover:text-white">
                            {item.icon}
                            <span className='text-[17px] z-20'>{item.label}</span>
                        </Link>
                    ))}

                </div>
            </div>
            {
                isAuthenticated() ?
                    <button
                        onClick={logout}
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center px-2 py-2 bg-gray-200 space-x-2 w-[85%] rounded-md cursor-pointer border border-[#1F1F1F] text-[#1F1F1F]">
                        {logoutButton.icon}
                        <span className='text-[17px] z-20'>{logoutButton.label}</span>
                    </button> : null
            }
        </aside>
    );
}

export default Sidebar;
