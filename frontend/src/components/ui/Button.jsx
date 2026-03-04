import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
        primary: 'bg-nk-olive text-nk-sand-light hover:bg-nk-olive-dark shadow-md',
        secondary: 'bg-nk-sand text-nk-olive-dark border border-nk-olive/20 hover:bg-nk-sand-dark',
        outline: 'bg-transparent text-nk-olive border-2 border-nk-olive hover:bg-nk-olive hover:text-nk-sand-light',
        accent: 'bg-white text-nk-olive border border-nk-sand shadow-sm hover:border-nk-olive transition-colors',
        ghost: 'bg-transparent text-nk-olive hover:bg-nk-sand/20',
    };

    const sizes = {
        sm: 'px-5 py-2 text-xs uppercase tracking-widest font-bold',
        md: 'px-7 py-3 text-sm uppercase tracking-widest font-bold',
        lg: 'px-10 py-4 text-base uppercase tracking-widest font-black',
    };

    return (
        <motion.button
            ref={ref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-sm font-ui transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export default Button;
