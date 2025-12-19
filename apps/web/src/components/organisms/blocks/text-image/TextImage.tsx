import DynamicButton from '@/components/atoms/frontend/buttons/DynamicButton';
import { ImageMedia } from '@/components/atoms/frontend/media/ImageMedia';
import type { BC } from '@/lib/types/block-props';
import { cn } from '@/lib/utilities/ui';
import type { TextImage as TextImageProps } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';
import BaseBlock from '../base-block/BaseBlock';

const TextImageBlock: BC<TextImageProps> = ({ block, locale }) => {
    const { order, image, richText, addLink, link, addBgColor, heading, mode } = block;

    const imageColClasses = cn(
        'col-span-12 mb-10 relative',
        order === 'image-right' ? 'lg:col-start-7 lg:col-span-6 lg:row-start-1' : 'lg:col-start-1 lg:col-span-6',
    );

    const textColClasses = cn(
        'col-span-12 space-y-m',
        order === 'image-right' ? 'lg:col-start-1 lg:col-span-5 lg:row-start-1' : 'lg:col-start-7 lg:col-span-5',
    );

    return (
        <BaseBlock
            classNameOuter={cn(
                addBgColor &&
                    'bg-bg-highlight text-fg-on-color py-section-sm relative overflow-hidden mb-section-xs md:mb-section-m',
            )}
        >
            <div className="oakgrid">
                <div className={imageColClasses}>
                    {/* Single Image */}
                    {mode === 'addImageSingle' && (
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <ImageMedia resource={image} imgClassName="w-full h-full object-cover filter grayscale" />
                        </div>
                    )}
                    {/* Duplicate Image */}
                    {mode === 'addImageDuplication' && (
                        <div className="relative w-full max-w-[591px] mx-auto">
                            {/* bageste boks + billede */}
                            <div className="absolute top-0 left-0 w-[90%] h-[90%] aspect-[4/3] bg-bg-section-2 overflow-hidden">
                                <ImageMedia resource={image} imgClassName="w-full h-full object-cover aspect-[4/3]" />
                                <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-overlay-red" />
                            </div>

                            {/* forreste billede forskudt med padding for overlap — samme som single */}
                            <div className="relative z-10 pl-[10%] pt-[10%]">
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <ImageMedia
                                        resource={image}
                                        imgClassName="w-full h-full object-cover filter grayscale"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Text + Button */}
                <div className={textColClasses}>
                    {heading && <h3 className="uppercase">{heading}</h3>}
                    {richText && <RichText data={richText} className="mx-0" />}
                    {addLink && (
                        <DynamicButton
                            link={link}
                            locale={locale}
                            className="w-fit"
                            variant={addBgColor ? 'primaryOnColor' : 'primary'}
                        />
                    )}
                </div>
            </div>
        </BaseBlock>
    );
};

export default TextImageBlock;
