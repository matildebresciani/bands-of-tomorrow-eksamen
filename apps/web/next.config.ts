import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const isHttpOrHttps = (proto: string) => proto === 'http' || proto === 'https';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        qualities: [25, 50, 75, 100],
        remotePatterns: [
            ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
                const url = new URL(item);

                const protocol = url.protocol.replace(':', '');
                if (!isHttpOrHttps(protocol)) {
                    throw new Error(`Invalid protocol: ${protocol}`);
                }

                return {
                    hostname: url.hostname,
                    protocol,
                } as const;
            }),
        ],
    },
    reactStrictMode: true,
    redirects,
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
