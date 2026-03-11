import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = ({ className, children, hover = true, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -12, scale: 1.02 } : {}}
            className={cn(
                'bg-nk-sand/10 border border-nk-olive/10 p-8 rounded-none transition-all duration-500 relative overflow-hidden',
                'hover-pop',
                'before:absolute before:top-0 before:left-0 before:w-1 before:h-0 before:bg-nk-olive before:transition-all hover:before:h-full',
                hover && 'hover:bg-nk-sand/20 hover:border-nk-olive/30',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
