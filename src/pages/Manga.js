import React from 'react'
import { Outlet } from "react-router-dom";
import { useParams, Link } from 'react-router-dom';


const Manga = () => {
    let { id } = useParams();

    const menuItems = [
        { label: 'Overview', link: 'overview' },
        { label: 'Chapters', link: 'chapters' },
        { label: 'Manga Art', link: 'manga-art' }
    ];
    return (
        <div className='bg-[#1F1F1F] w-full h-[max-content] px-2 pt-2 pb-8 md:p-5 relative'>
            <div className='flex mx-auto w-[100%] md:w-[95%] text-center text-white mt-5 '>
                {
                    menuItems.map((item, i) => (
                        <Link to={`/manga/${id}/${item.link}`} key={i} className='list-none text-[9px] md:text-[20px] mx-auto px-1 md:px-7 py-2 basis-1/3 border-x-[1.5px] border-opacity-30 border-spacing-2 md:border-2 border-[#1F1F1F] md:font-medium tracking-[0.3em] hover:bg-white hover:text-black cursor-pointer bg-[#1B6FA8]'>
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