import React from 'react';
import {
    HomeIcon,
    BookmarkSquareIcon,
    UserCircleIcon,
    MagnifyingGlassCircleIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

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
    return (
        <aside className=" sticky top-[80px] h-[calc(100vh-80px)] hidden lg:block overflow-y-auto p-5 w-1/5 p-4 shadow-xl text-white text-left bg-[#1B6FA8]">
            <div className="mt-10">
                <div className="pb-3 mb-2">
                    <h5 className="text-Light-Ice-Blue font-light text-[17px]">Menu -</h5>
                </div>
                <div className="pl-2 space-y-6">
                    {menuItems.map((item, index) => (
                        <Link to={item.link} key={index} className="flex items-center space-x-2 py-2 px-2 rounded-md hover:bg-[#F4B333] cursor-pointer">
                            {item.icon}
                            <span className='lg:text-[15px] text-[17px]'>{item.label}</span>
                            {/* {item.badge && (
                                <span className="ml-auto flex items-center justify-center rounded-full bg-[#E40066] text-white lg:text-[0.65rem] text-xs w-5 h-5 p-2">
                                    {item.badge}
                                </span>
                            )} */}
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
                        <Link to={item.link} key={index} className="flex items-center space-x-2 py-2 px-2 rounded-md hover:bg-[#F4B333] cursor-pointer">
                            {item.icon}
                            <span className='g:text-[15px] text-[17px]'>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
