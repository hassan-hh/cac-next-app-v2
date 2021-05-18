// Fix cors error
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://cats-db-cust-ap-dev.corpaction.net/api/0_0_1/:path*',
            },
        ]
    },
    future: {
        webpack5: true
    },
};