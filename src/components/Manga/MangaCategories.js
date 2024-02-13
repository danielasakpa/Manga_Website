

// Manga Categories Component
const MangaCategories = ({ mangaData }) => {
    return (
        <div className='mt-6 flex justify-center flex-col'>
            <p className='text-[20px]'>Category</p>
            <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-4 w-[100%] md:w-[100%]'>
                {mangaData?.attributes.tags.slice(0, 10).map((item) => (
                    <div
                        className={`py-1 px-1 flex items-center justify-center rounded-md font-semibold text-center bg-white text-[10px] md:text-[13px] tracking-[0.1em] text-[#1F1F1F]`}
                        key={item.id}
                    >
                        {item.attributes.name.en.toString()}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MangaCategories;