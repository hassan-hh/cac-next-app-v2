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
    // async headers() {
    //     return [
    //         {
    //             source: '/api/user/login',
    //                 headers: [
    //                     {
    //                         key: 'Set-Cookie',
    //                         //value: '_ga=GA1.2.1647909312.1616581407',
    //                         value: 'JSESSIONID=Mzk5ZDk3NjMtNzFiNi00NTc1LWEzY2EtYTUzMDkzNWFkZGUx; Path=/; HttpOnly; SameSite=Lax',
    //                     },
    //                     {
    //                         key: 'Access-Control-Allow-Credentials',
    //                         value: 'true',
    //                     }
    //                 ]
    //         }
    //     ]
    // },
    future: {
        webpack5: true
    },
};