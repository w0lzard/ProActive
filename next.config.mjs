import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.usegalileo.ai',
            }
        ],
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
