// Fix cors error
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, //Replace API URL in .env.local
            },
        ]
    },
};