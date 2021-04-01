import Link from 'next/link'

const DashboardNav = () => {

    return (
        <nav className="bg-white py-6 px-6 lg:px-14 shadow-xl">
            <div className="flex justify-start">
                <Link href='/dashboard/help'>
                    <a><img className="pr-4" src="/help.png" alt="Help Icon"/></a>
                </Link>
                <Link href='/dashboard'>
                    <a><img src="/home.png" alt="Home Icon"/></a>
                </Link>
                <div className="ml-auto">
                    <Link href='/'>
                            <a><img src="/sign-out.png" alt="Logout Icon"/></a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default DashboardNav