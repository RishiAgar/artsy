/** @type {import('next').NextConfig} */

const nextConfig = {
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
            {
                source: '/categories',
                destination: '/',
                permanent: true,
            },
            {
                source: '/categories/',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
