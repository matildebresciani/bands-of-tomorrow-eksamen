import Quotation from '@/components/atoms/frontend/icons/Quotation';
import RichText from '@/components/molecules/admin/RichText';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import Image from 'next/image';
import type React from 'react';

type Props = {
    quoteText?: SerializedEditorState | null;
    showName?: boolean | null;
    name?: string | null;
};

const Quote = ({ quoteText, showName, name }: Props) => {
    return (
        <div className="oakgrid relative">
            <div className="col-start-2 col-span-2 absolute top-0 left-0 z-0">
                <Quotation />
            </div>

            <div className="col-start-3 col-span-8 z-10 flex flex-col gap-3 pt-10">
                {quoteText && <RichText data={quoteText} className="italic" />}
                {showName && name && <p className="font-bold">-{name}</p>}
            </div>
        </div>
    );
};

export default Quote;
