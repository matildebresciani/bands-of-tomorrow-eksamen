import { defaultLocale } from '@/i18n/localized-collections';
import { DateTime } from 'luxon';

export const formatDateTime = (
    date: string | Date | null,
    format: 'default' | 'short' | 'long' | 'dot' | 'dateTime' = 'default',
): string => {
    if (!date) return '';
    let dateTime: DateTime;
    if (typeof date === 'string') {
        dateTime = DateTime.fromISO(date);
        if (!dateTime.isValid) {
            dateTime = DateTime.fromJSDate(new Date(date));
        }
    } else {
        dateTime = DateTime.fromJSDate(date);
    }
    if (!dateTime.isValid) return '';
    switch (format) {
        case 'dot':
            return dateTime.toFormat('dd.MM.yyyy');
        case 'short':
            return dateTime.setLocale(defaultLocale).toFormat('d. LLL yyyy');
        case 'long':
            return dateTime.setLocale(defaultLocale).toFormat('d. LLLL yyyy');
        case 'dateTime':
            return dateTime.toFormat('dd.MM.yyyy HH:mm');
        default:
            return dateTime.toFormat('yyyy-MM-dd');
    }
};

export const formatTime = (timestamp: string): string => {
    if (!timestamp) return '-';
    const dateTime = DateTime.fromISO(timestamp);
    if (!dateTime.isValid) return '-';
    return dateTime.toFormat('HH:mm');
};
