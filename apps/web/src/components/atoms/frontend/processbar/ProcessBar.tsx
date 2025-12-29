'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollBar() {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        mass: 0.1,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-button-primary-hover origin-left z-[1000]"
            style={{ scaleX }}
        />
    );
}
