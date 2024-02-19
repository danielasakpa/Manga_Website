import React, { useContext, useEffect, useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import LeftArrowIcon from '../../assets/left-arrow.png';
import RightArrowIcon from '../../assets/right-arrow.png';
import useSwipe from '../../hooks/useSwipe/useSwipe';

const HorizontalScrollMenu = ({ children }) => {
    const { onTouchEnd, onTouchMove, onTouchStart } = useSwipe();

    const ref = useRef(null);

    useEffect(() => {
        const onTouchMove = (ev) => {
            ev.preventDefault();
        };
        const node = ref.current.scrollContainer.current;
        node?.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => node?.removeEventListener('touchmove', onTouchMove);
    }, [ref]);


    const LeftArrow = () => {
        const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

        return (
            <div
                disabled={isFirstItemVisible}
                onClick={() => scrollPrev()}
                className="absolute z-10 hover:bg-white hover:bg-opacity-20 flex justify-center items-center cursor-pointer left-0 h-[100%] w-[30px] md:w-[40px] top-0 bottom-0 bottom-2"
            >
                <img
                    className="w-[25px] h-[25px] p-[5px] md:w-[35px] md:h-[35px] bg-black rounded-full"
                    src={LeftArrowIcon}
                    alt="left-arrow"
                />
            </div>
        );
    };

    const RightArrow = () => {
        const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

        return (
            <div
                disabled={isLastItemVisible}
                onClick={() => scrollNext()}
                className="absolute z-10 hover:bg-white hover:bg-opacity-20 flex justify-center items-center cursor-pointer h-[100%] w-[30px] md:w-[40px] bottom-2 top-0 bottom-0 right-0"
            >
                <img
                    className="w-[25px] h-[25px] p-[5px] md:w-[35px] md:h-[35px] bg-black rounded-full"
                    src={RightArrowIcon}
                    alt="right-arrow"
                />
            </div>
        );
    };

    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
            onTouchStart={onTouchStart}
            apiRef={ref}
        >
            {children}
        </ScrollMenu>
    );
};


export default HorizontalScrollMenu;


