/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/api/teams',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
