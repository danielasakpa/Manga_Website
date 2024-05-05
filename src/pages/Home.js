import React from 'react';
import MangaSlider from '../components/Manga/MangaSlider';
import MangaCards from '../components/Manga/MangaCards';
import { useNavigate, Link } from 'react-router-dom';
import LatestUploadedCards from '../components/Manga/LatestUploadedCards';
// import fetchSeasonalMangas from '../API/manga/fetchSeasonalMangas';
// import fetchMangasByIds from '../API/manga/fetchMangasByIds';
import { ArrowRightCircleIcon  } from "@heroicons/react/24/outline";

const Home = () => {

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

    async function someFunction() {
        try {
            // const mangas = await fetchSeasonalMangas()
            // .then(seasonalMangasData => {
            //     return fetchMangasByIds(seasonalMangasData);
            // })
            // .then(data => {
            //     console.log('Fetched mangas:', data);
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
            // console.log(mangas); // Now mangas will contain the resolved value
        } catch (error) {
            console.error('Error fetching seasonal mangas:', error);
        }
    }

    const handelSearch = async (category) => {
      navigate(`/search?category=${encodeURIComponent(category)}`);
  };

    const handleCategorySelect = (category) => {
        handelSearch(category);
    }


    return (
      <div className="w-full">
        <div className="flex justify-center w-full mt-4 md:mt-10">
          <MangaSlider />
        </div>

        <div className="flex justify-center w-full mt-10">
          <div className="pt-4 w-[90%]">
            <h4 className="text-[20px] tracking-[0.4em] font-semibold mb-3">
              <span className="text-[#E40066]">Hot</span> Categories
            </h4>
            <div className="flex flex-wrap justify-center rounded-t-lg py-5 px-2 sm:px-5 gap-4 bg-[#F4B333]">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-2 md:px-6 py-2 text-[11px] md:text-[20px] rounded-[5px] font-semibold tracking-[0.2em] border border-[#1F1F1F]
                                        bg-gray-200 text-[#1F1F1F]`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="py-5 bg-[#1F1F1F]">
          <div className="flex flex-col justify-center px-[20px] py-4">
            <div
              className="flex items-center justify-between mb-2"
            >
              <h4 className="gradient-1 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start">
                Latest Uploaded Chapter
              </h4>
              <Link to={`/latest-chapters`} className='flex items-center gap-2 cursor-pointer'>
                <span className='hidden sm:block text-white font-semibold text-[25px] hover:text-[#F4B333]'>See more</span>
                <ArrowRightCircleIcon  className="w-6 h-6 text-gray-500 sm:h-8 sm:w-8" />
              </Link>
            </div>
            <div>
              <LatestUploadedCards
                type={"Latest Uploaded Chapter"}
                order={{ readableAt: "desc" }}
                limit={20}
                includes={["user", "scanlation_group", "manga"]}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-[20px] py-4">
            <h4 className="gradient-2 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start">
              Most Viewed
            </h4>
            <MangaCards
              type={"Most viewed"}
              order={{ followedCount: "desc" }}
              limit={10}
              includedTags={[]}
              excludedTags={["Boys' Love", "doujinshi", "Romance"]}
            />
          </div>
          <div className="flex flex-col items-center justify-center px-[20px] py-4">
            <h4 className="gradient-2 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start">
              Highest Rating
            </h4>
            <MangaCards
              type={"Highest Rating"}
              order={{ rating: "desc" }}
              limit={10}
              includedTags={[]}
              excludedTags={["Boys' Love", "doujinshi", "Romance"]}
            />
          </div>
          <div className="flex flex-col items-center justify-center px-[20px] py-4">
            <h4 className="gradient-3 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start">
              Recently Added
            </h4>
            <MangaCards
              type={"recently Added"}
              order={{ createdAt: "desc" }}
              limit={10}
              includedTags={[]}
              excludedTags={["Boys' Love", "doujinshi", "Romance"]}
            />
          </div>
        </div>
      </div>
    );
}

export default Home