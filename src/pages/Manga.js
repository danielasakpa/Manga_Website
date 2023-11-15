import React from 'react'
import { Outlet } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';


const Manga = () => {
    let { id } = useParams();
    const menuItems = [
        { label: 'Overview', link: 'overview' },
        { label: 'Chapters', link: 'chapters' },
        { label: 'Recommendations', link: 'recommendations' }
    ];
    return (
        <div className='bg-[#1F1F1F] w-full p-2 md:p-5'>
            <div className='flex mx-auto w-[100%] md:w-[95%] text-center text-white mt-5 '>
                {
                    menuItems.map((item) => (
                        <Link className='list-none text-[10px] md:text-[20px] mx-auto px-4 md:px-7 py-2 basis-1/3 border-2 border-[#1F1F1F] md:font-medium tracking-[0.3em] hover:bg-white hover:text-black cursor-pointer bg-[#1B6FA8]' to={`/manga/${id}/${item.link}`}>
                            {item.label}
                        </Link>
                    ))
                }
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Manga