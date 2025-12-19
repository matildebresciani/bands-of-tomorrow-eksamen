import { getCachedSitemap } from '@/lib/data/payload/get-cached-sitemap';
import { getServerSideSitemap } from 'next-sitemap';

const collection = 'articles';
const locale = 'da';

export async function GET() {
    const sitemap = await getCachedSitemap(collection, locale);
    return getServerSideSitemap(sitemap);
}
