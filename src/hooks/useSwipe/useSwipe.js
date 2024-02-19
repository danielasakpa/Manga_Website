import { useState } from "react";

const useSwipe = () => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 20;

    const onTouchStart = () => (e) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = () => (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (apiObj) => () => {
        if (!touchStart || !touchEnd) return false;
        const distance = touchStart - touchEnd;
        const isSwipe = Math.abs(distance) > minSwipeDistance;
        const isLeftSwipe = distance < minSwipeDistance;
        if (isSwipe) {
            if (isLeftSwipe) {
                apiObj.scrollPrev(); // Implement your logic for left swipe
            } else {
                apiObj.scrollNext(); // Implement your logic for right swipe
            }
        }
    };

    return { onTouchStart, onTouchEnd, onTouchMove };
};

export default useSwipe;