import { Heading } from '@/components/atoms/frontend/heading/Heading';

const BackgroundHeadings = () => {
    const startOffset = -20; // vw – hvor langt første linje starter til venstre
    const step = 8; // vw – hvor meget hver linje rykker mod højre

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible top-0">
            <div className="flex flex-col gap-6">
                {Array.from({ length: 10 }).map((_, rowIndex) => {
                    const offset = startOffset + rowIndex * step;

                    return (
                        <div
                            key={rowIndex}
                            className="flex gap-12 whitespace-nowrap"
                            style={{
                                transform: `translateX(${offset}vw)`,
                            }}
                        >
                            <Heading level={2} className="hyphens-none leading-none whitespace-nowrap break-words-0">
                                Gallerier
                            </Heading>
                            <Heading level={2} className="hyphens-none leading-none whitespace-nowrap break-words-0">
                                Gallerier
                            </Heading>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BackgroundHeadings;
