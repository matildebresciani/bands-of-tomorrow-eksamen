'use client';

type Props = {
    bannerText: string;
    repeatCount?: number;
    duration?: number;
};

const BannerSlider = ({ bannerText, repeatCount = 30, duration = 40 }: Props) => {
    const items = Array.from({ length: repeatCount }).map((_, i) => (
        <span key={i} className="px-s text-fg-subtle button-text">
            {bannerText}
        </span>
    ));

    return (
        <div className="absolute top-s left-0 w-full overflow-hidden whitespace-nowrap">
            <div className="inline-flex animate-marquee" style={{ animationDuration: `${duration}s` }}>
                <div className="inline-flex">{items}</div>
                <div className="inline-flex">{items}</div>
            </div>
        </div>
    );
};

export default BannerSlider;
