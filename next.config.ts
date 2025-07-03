import type { NextConfig } from "next";

const allowedDomains = process.env.ALLOWED_IFRAME_DOMAINS || ''

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: "/embed",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: `frame-ancestors ${allowedDomains};`,
                    },
                    {
                        key: "X-Frame-Options",
                        value: `ALLOW-FROM ${allowedDomains}`,
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
