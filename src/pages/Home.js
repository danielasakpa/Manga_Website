import React from 'react';
import { useMangaContext } from '../context/MangaContext';
import fetchMangas from '../API/manga/fetchMangas';
import MangaSlider from '../components/Manga/MangaSlider';
import MangaCards from '../components/Manga/MangaCards';
import showToast from '../utils/toastUtils';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import tags from '../assets/tags';

const Home = () => {

    const { setMangas, isLoading, setLoading } = useMangaContext();

    const navigate = useNavigate();

    const categories = [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Isekai",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Slice of Life",
        "Sports",
        "Thriller",
        "Historical",
        "Psychological",
        "School Life",
        "Magic",
        "Mecha"
    ];


    const handelSearch = async (category) => {
        setLoading(true);

        const limit = 30;
        const excludedTags = ["Boys' Love"];


        const searchParams = {
            includedTags: [category],
        };

        try {
            const res = await fetchMangas(tags, { followedCount: 'desc', rating: 'desc' }, limit, searchParams.includedTags, excludedTags, 0, "search");

            setMangas(res.data);
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setLoading(false);
            navigate("/search");
        }
    }

    const handleCategorySelect = (category) => {
        handelSearch(category);
    }


    return (
        <div className='w-full'>
            <div className='flex justify-center w-full mt-10'>
                <MangaSlider />
            </div>

            <div className='flex justify-center w-full mt-10'>
                <div className="pt-4 w-[90%]">
                    <h4 className="text-[20px] tracking-[0.4em] font-semibold mb-3"><span className='text-[#E40066]'>Hot</span> Categories</h4>
                    <div className="flex flex-wrap justify-center rounded-t-lg p-5 gap-4 bg-[#F4B333]">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-2 md:px-6 py-2 text-[11px] md:text-[20px] rounded-md font-semibold tracking-[0.2em] border border-[#1F1F1F]
                                        bg-gray-200 text-[#1F1F1F]`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='py-5 bg-[#1F1F1F]'>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-1 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Most Viewed</h4>
                    <MangaCards type={"viewedMost"} order={{ followedCount: 'desc', rating: 'desc' }} limit={10} includedTags={[]} excludedTags={["Boys' Love", "doujinshi"]} />
                </div>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-2 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Popular New</h4>
                    <MangaCards type={"popularNew"} order={{ year: 'desc', followedCount: 'desc' }} limit={10} includedTags={["action"]} excludedTags={["Boys' Love", "doujinshi", "Romance"]} />
                </div>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-3 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Recently Added</h4>
                    <MangaCards type={"recentlyAdded"} order={{ year: 'desc' }} limit={10} includedTags={[]} excludedTags={["Boys' Love", "doujinshi"]} />
                </div>
            </div>
            {isLoading && (
                <>
                    <div
                        className={`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                    >
                        <BallTriangle
                            height="80"
                            width="80"
                            radius={5}
                            color="#ffffff"
                            ariaLabel="ball-triangle-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                    <div className={`"opacity-25 fixed inset-0 z-40 bg-black`}></div>
                </>
            )}
        </div>
    )
}

export default Home