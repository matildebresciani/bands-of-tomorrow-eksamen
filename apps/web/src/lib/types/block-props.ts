import type { Locale } from '@/i18n/localized-collections';
import type { Option } from '@/payload-types';
import type { FC } from 'react';

export type BlockProps<T> = {
    block: T;
    locale?: Locale;
    translations?: Option['translations'];
    pageId: string;
};

export type BC<T> = FC<BlockProps<T>>;
