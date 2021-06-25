// Fix cors error
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                //destination: 'https://cats-db-cust-ap-dev.corpaction.net/api/0_0_1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
            },
        ]
    },
    // future: {
    //     webpack5: true
    // },
};