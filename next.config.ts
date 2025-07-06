/** @type {import('next').NextConfig} */
const allowedDomains = (process.env.ALLOWED_IFRAME_DOMAINS || '')
  .split(',')
  .map(d => d.trim())
  .filter(Boolean);

const nextConfig = {
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
    const cspDomains = ['\'self\'', ...allowedDomains].join(' ');
    return [
      {
        source: '/embed',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors ${cspDomains};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
