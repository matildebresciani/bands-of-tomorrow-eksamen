// HeaderServer.tsx (Server Component)
import HeaderClient from '@/components/organisms/global/header/HeaderClient';
import type { Locale } from '@/i18n/localized-collections';
import { getCachedNavigation } from '@/lib/data/payload/get-cached-navigation';

export default async function HeaderServer({ locale }: { locale: Locale }) {
    const [main, secondary, mobile] = await Promise.all([
        getCachedNavigation('position.main', locale),
        getCachedNavigation('position.secondary', locale),
        getCachedNavigation('position.mobile', locale),
    ]);

    return <HeaderClient main={main} secondary={secondary} mobile={mobile} locale={locale} />;
}
