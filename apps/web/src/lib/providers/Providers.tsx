import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import ReactQueryProvider from './ReactQueryProvider';

type Props = {
    children: React.ReactNode;
};

export const Providers: FC<Props> = async ({ children }) => {
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster position="bottom-right" />
        </NextIntlClientProvider>
    );
};

export default Providers;
