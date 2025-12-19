import Grafik from '@/components/atoms/frontend/icons/Grafik';
import type { BC } from '@/lib/types/block-props';
import type { Divider as DividerProps } from '@/payload-types';
import Image from 'next/image';
import BaseBlock from '../base-block/BaseBlock';
import './divider.scss';

const DividerBlock: BC<DividerProps> = () => {
    return (
        <BaseBlock>
            <div className="oakgrid">
                <div className="col-span-12 flex items-center gap-5">
                    <span className="divider" />
                    <Grafik width={500} height={500} />
                    <span className="divider" />
                </div>
            </div>
        </BaseBlock>
    );
};

export default DividerBlock;
