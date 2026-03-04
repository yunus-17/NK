import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useCountUp = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCount);
            }
        };

        animationFrame = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
};

const CountUp = ({ end, suffix = "" }) => {
    const count = useCountUp(end);
    return <span>{count}{suffix}</span>;
};

export default CountUp;
