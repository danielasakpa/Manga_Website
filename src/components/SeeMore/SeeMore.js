import { Oval } from 'react-loader-spinner'

const SeeMore = ({ handleSeeMore, isLoadingNewMangas }) => {
    console.log(isLoadingNewMangas)
    return (
        <div
            className="md:mr-7 flex justify-center items-center bg-white text-black font-medium tracking-[0.3em] hover:bg-[#E40066] hover:text-white cursor-pointer h-[100%] w-[100px] bottom-2 left-14"
            onClick={handleSeeMore}
        >
            {
                isLoadingNewMangas ?
                    <Oval
                        visible={true}
                        height="30"
                        width="30"
                        color="#000000"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    :
                    <p className="text-center">See More</p>
            }
        </div>
    );
};

export default SeeMore;