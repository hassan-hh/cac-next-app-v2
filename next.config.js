// Fix cors error
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: 'https://cats-db-cust-ap-dev.corpaction.net/api/0_0_1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
            },
        ]
    },
<<<<<<< HEAD
=======
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'sessionid',
                        value: 'E07AB675BD9049A6B2BE18A48F494C32',
                    },
                    // {
                    //     key: 'XSRF-TOKEN',
                    //     value: 'E07AB675BD9049A6B2BE18A48F494C32'//process.env.CSRF_SECRET,
                    // },
                ],
            }
        ]
    },
>>>>>>> ec7975f00a75d8fc79aab06685164445a22b7386
    // httpAgentOptions: {
    //     keepAlive: false,
    // },
    // reactStrictMode: true,
    // poweredByHeader: false,
};