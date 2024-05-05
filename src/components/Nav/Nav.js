import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FireIcon } from "@heroicons/react/24/outline";
import { MenuSidebar } from '../MenuSidebar/MenuSidebar';


function Nav() {
    const [mangaName, setMangaName] = useState('');
    const navigate = useNavigate();

    // Function to handle search and navigate to "/search" route with mangaName as query parameter
    const handleSearch = () => {
        if (mangaName) {
            navigate(`/search?title=${encodeURIComponent(mangaName)}`);
        }
    };


    // Function to handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="flex sticky top-0 z-30 items-center justify-between bg-[#FAFCFC] border-b-[2px] border-[#1F1F1F] h-[80px] px-3 lg:px-8 py-4">
            <div>
                <Link to='/' className='flex items-center justify-between m-0 w-min'>
                    <span className="text-[30px] md:text-[40px] text-[#1B6FA8] leading-[40px] tracking-[0.05em]">Yuki</span>
                    <span className="text-[25px] md:text-[35px]">雪</span>
                </Link>
            </div>

            <div className='flex items-center justify-between space-x-2 lg:space-x-5'>
                <div className='hidden lg:block mr-[20px]'>
                    <div className="flex items-center overflow-hidden border border-[#1F1F1F] rounded-[3px]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Mange Name"
                                value={mangaName}
                                onChange={(e) => setMangaName(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className=" bg-white border-r border-[#1F1F1F] px-4 py-2 h-[50px] w-[400px] focus:outline-none"
                            />
                        </div>
                        <button
                            className="flex items-center bg-[#1B6FA8] text-white btn h-[50px] py-2 px-4"
                            onClick={() => handleSearch()}
                        >
                            <span className='z-20'>Search Here</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <Link
                    to='/search'
                    className='flex justify-center lg:hidden items-center text-[12px] text-white h-[max-content] md:text-[16px] px-4 lg:px-5 py-[0.2rem] mr-[10px] border border-gray-700  bg-[#1B6FA8] rounded-[3px]'
                >
                    Explore Mangas
                    <FireIcon className="w-4 h-4 text-[#fabe47] ml-[7px]" />
                </Link>
                <MenuSidebar />
            </div>
        </nav>
    );
}

export default Nav;
