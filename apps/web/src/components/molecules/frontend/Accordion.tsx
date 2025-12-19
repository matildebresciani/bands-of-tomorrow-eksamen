'use client';
import Chevron from '@/components/atoms/frontend/icons/Chrevron';
import { cn } from '@/lib/utilities/ui';
import { type ReactNode, useId, useState } from 'react';

type Props = {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
};

const Accordion = ({ title, children, defaultOpen = false }: Props) => {
    const accordionId = useId();
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="w-full border-b-1 border-b-black/25 py-8 md:py-10">
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={accordionId}
                className="flex justify-between items-center gap-5 w-full text-lg leading-[155%] font-bold text-left cursor-pointer lg:text-xl"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="px-s heading-4">{title}</span>
                <div>
                    <Chevron className={cn('transition-transform duration-200', isOpen ? 'rotate-270' : 'rotate-90')} />
                </div>
            </button>
            <div id={accordionId} className={cn('grid transition-all', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                <div aria-hidden={!isOpen} className="h-full overflow-hidden">
                    <div className="wysiwyg max-w-[850px] pt-6 px-s">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
