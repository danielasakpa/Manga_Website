

// Manga Details Section Component
const MangaDetailsSection = ({ mangaDetails }) => {
    return (
        <div className='flex flex-wrap xl:flex-nowrap justify-center text-center my-4'>
            {mangaDetails.map((detail, index) => (
                <div
                    key={index}
                    className='text-[10px] md:text-[15px] px-4 md:px-7 py-2 basis-1/3 border-2 border-[#1F1F1F] font-medium tracking-[0.1em] lg:tracking-[0.2em] cursor-pointer bg-white text-[#1F1F1F]'
                >
                    {
                        detail.label === "follows" ?
                            detail.value.toLocaleString()
                            :
                            detail.value
                    }
                </div>
            ))}
        </div>
    );
};

export default MangaDetailsSection;