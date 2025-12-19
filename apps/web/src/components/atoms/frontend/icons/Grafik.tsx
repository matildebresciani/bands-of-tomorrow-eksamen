import { cn } from '@/lib/utilities/ui';
import type { FC, SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & { className?: string };

const Grafik: FC<Props> = ({ className, width, height, ...rest }) => {
    return (
        <svg
            width={width}
            height={168}
            viewBox="0 0 182 168"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            {...rest}
        >
            <title>Grafik Icon</title>
            <g filter="url(#filter0_n_576_409)">
                <path
                    d="M143.26 54.37L110.328 84.5626L175.255 109.462L107.857 98.8423L130.893 133.689L97.1551 108.393L90.3512 145.103L82.3111 109.566L56.9734 139.531L68.9947 101.913L29.4196 110.342L62.2921 88.3586L38.0159 82.9822L64.7635 74.0789L41.7269 39.2318L75.4651 64.5285L75.6501 19.0905L89.1532 66.5809L108.909 42.9942L103.625 71.0078L143.26 54.37Z"
                    fill="#DF4739"
                />
            </g>
            <g filter="url(#filter1_n_576_409)">
                <path
                    d="M147.809 57.2733L114.877 87.4659L179.803 112.366L112.405 101.746L135.442 136.593L101.704 111.296L94.8997 148.006L86.8596 112.469L61.5219 142.434L73.5431 104.817L33.968 113.245L66.8405 91.262L42.5644 85.8855L69.312 76.9822L46.2754 42.1351L80.0135 67.4319L80.1986 21.9938L93.7016 69.4842L113.457 45.8976L108.174 73.9111L147.809 57.2733Z"
                    fill="#33261C"
                />
            </g>
            <defs>
                <filter
                    id="filter0_n_576_409"
                    x="29.4196"
                    y="19.0903"
                    width="145.835"
                    height="126.013"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="2 2"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="8466"
                    />
                    <feComponentTransfer in="noise" result="coloredNoise1">
                        <feFuncR type="linear" slope="2" intercept="-0.5" />
                        <feFuncG type="linear" slope="2" intercept="-0.5" />
                        <feFuncB type="linear" slope="2" intercept="-0.5" />
                        <feFuncA
                            type="discrete"
                            tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                    <feComponentTransfer in="noise1Clipped" result="color1">
                        <feFuncA type="table" tableValues="0 0.15" />
                    </feComponentTransfer>
                    <feMerge result="effect1_noise_576_409">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
                <filter
                    id="filter1_n_576_409"
                    x="33.968"
                    y="21.9937"
                    width="145.835"
                    height="126.013"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1 1"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="9151"
                    />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA
                            type="discrete"
                            tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect1_noise_576_409">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
};

export default Grafik;
