/** @type {import('next').NextConfig} */

const nextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
        }],
    },
    async redirects() {
        return [
            {
                source: '/products',
                destination: '/',
                permanent: true,
            },
            {
                source: '/products/',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
