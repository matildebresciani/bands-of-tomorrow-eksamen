'use client';
import Grafik from '@/components/atoms/frontend/icons/Grafik';
import type { BC } from '@/lib/types/block-props';
import type { Divider as DividerProps } from '@/payload-types';
import { motion, useScroll, useTransform } from 'framer-motion';
import BaseBlock from '../base-block/BaseBlock';
import './divider.scss';
import { useRef } from 'react';

const DividerBlock: BC<DividerProps> = () => {
    const ref = useRef<HTMLDivElement>(null);

    // Scroll progress RELATIVT til denne block
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // 0 til 1 scroll = 0° til 720°
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

    return (
        <BaseBlock>
            <div ref={ref} className="oakgrid">
                <div className="col-span-12 flex items-center gap-5">
                    <span className="divider" />
                    <motion.div style={{ rotate }}>
                        <Grafik width={200} height={500} />
                    </motion.div>
                    <span className="divider" />
                </div>
            </div>
        </BaseBlock>
    );
};

export default DividerBlock;
