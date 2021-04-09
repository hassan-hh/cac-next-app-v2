// Fix cors error
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://cats-db-cust-eu-dev.corpaction.net/api/0_0_1/:path*',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/api/account/regions',
                // has: [
                //     {
                //             //type: 'header',
                //             key: 'host',
                //             value: 'cats-db-cust-eu-dev.corpaction.net',
                //         }
                //     ],
                    headers: [
                        {
                            //type: 'header',
                            key: 'Cookie',
                            value: '_ga=GA1.2.1647909312.1616581407; _gid=GA1.2.48919622.1617892771; JSESSIONID=NTY0ZmQ4YWItMzkxNi00OTU5LWJjNWUtODUxZmYyYzMwZDAx',
                        },
                        {
                            key: 'Credentials',
                            value: 'include',
                        },
                        {
                            key: 'Access-Control-Allow-Credentials',
                            value: 'true',
                        }
                    ]
            }
        ]
    },
    future: {
        webpack5: true
    },
};