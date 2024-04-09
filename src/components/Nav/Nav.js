import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';
import { FireIcon  } from "@heroicons/react/24/outline";


function Nav() {
    const [mangaName, setMangaName] = useState('');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

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
        <nav className="flex sticky top-0 z-20 items-center justify-between bg-[#FAFCFC] border-b-[2px] border-[#1F1F1F] h-[80px] px-3 lg:px-8 py-4">
            <div>
                <Link to='/' className='flex items-center justify-between m-0 w-min'>
                    <span className="text-[30px] md:text-[40px] text-[#1B6FA8] leading-[40px] tracking-[0.05em]">Yuki</span>
                    <span className="text-[25px] md:text-[35px]">雪</span>
                </Link>
            </div>

            <div className='flex items-center justify-between space-x-2 lg:space-x-5'>
                <div className='hidden lg:block mr-[20px]'>
                    <div className="flex items-center overflow-hidden border border-[#1F1F1F] rounded-lg">
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
                <Link
                    to='/search'
                    className='flex justify-center lg:hidden items-center text-[12px] text-white h-[max-content] md:text-[16px] px-4 lg:px-5 py-[0.2rem] mr-[10px] border border-gray-700  bg-[#1B6FA8] rounded-md'
                >
                    Explore Mangas
                    <FireIcon  className="w-4 h-4 text-[#fabe47] ml-[7px]"  />
                </Link>
                <Link to={isAuthenticated() ? "/profile" : "/login"} >
                    <div className="items-center hidden space-x-2 cursor-pointer lg:flex ">
                        <div
                            className={`w-12 h-12 ${user?.username ? "text-[35px]" : "text-[10px]"}  font-Roboto font-bold text-white rounded-full bg-gray-400 flex justify-center items-center`}
                        >
                            <span>
                                {
                                    user?.username ? user?.username.split("")[0] : "Sign In"
                                }
                            </span>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center space-x-2 cursor-pointer lg:hidden">
                    <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none lg:hidden">
                        {isMobileMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        }
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute right-0 z-auto w-full p-4 bg-white rounded-md shadow-lg lg:hidden top-20">
                    <div className="flex flex-col space-y-4">
                        <Link to={isAuthenticated() ? "/profile" : "/login"} className='flex items-center cursor-pointer' >
                            <div
                                className={`w-12 h-12 ${user?.username ? "text-[35px]" : "text-[10px]"}  font-Roboto font-bold text-white rounded-full bg-gray-400 flex justify-center items-center`}
                            >
                                <span>
                                    {
                                        user?.username ? user?.username.split("")[0] : "Sign In"
                                    }
                                </span>
                            </div>
                        </Link>
                        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                        <Link to="/search" className="text-gray-700 hover:text-gray-900">Discover Mangas</Link>
                        <Link to="/my-list" className="text-gray-700 hover:text-gray-900">My List</Link>
                        {
                            isAuthenticated() &&
                            <Link
                                to="/login"
                                onClick={logout}
                                className="text-gray-700 hover:text-gray-900">
                                Logout
                            </Link>
                        }
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Nav;
