import React from 'react'
import { MagnifyingGlassIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import DanImg from "../assets/dan.png"
import { Link } from 'react-router-dom';

function Nav() {

    const notificationCount = 14; // Number of notifications

    return (
        <nav className="flex sticky top-0 z-20 justify-between bg-[#FAFCFC] border-b-[2px] border-[#1F1F1F] h-[80px] px-3 lg:px-8 py-4">
            <div>
                <Link to='/' className='flex justify-between w-min m-0 items-center'>
                    <span className="text-[30px] md:text-[40px] text-[#1B6FA8] leading-[40px] tracking-[0.05em]">Yuki</span>
                    <span className="text-[25px] md:text-[35px]">雪</span>
                </Link>
            </div>
            <div className='flex items-center justify-between space-x-2 lg:space-x-5'>
                <div className='hidden lg:block'>
                    <div className="flex items-center overflow-hidden border border-gray-300 rounded-lg drop-shadow-x">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className=" bg-white border-r-2 border-gray-300 px-4 py-2 h-[50px] w-[400px] focus:outline-none"
                            />
                            <div className="absolute right-3 top-4">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <button className="bg-white hover:bg-[#E40066] hover:text-white h-[50px] py-2 px-4">
                            Search here
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <button className="relative flex items-center justify-center bg-transparent border-none focus:outline-none">
                        <BellAlertIcon className="md:w-10 md:h-10 w-5 h-5 text-gray-400" />
                        {notificationCount > 0 && (
                            <span className="absolute px-1 py-1 text-xs text-white bg-red-500 rounded-full -top-1 -right-0">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <img
                        src={DanImg}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="hidden lg:block">
                        <h3 className="font-medium text-md lg:text-lg">Daniel Asakpa</h3>
                        <span className="font-semibold text-green-500">Verified</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav