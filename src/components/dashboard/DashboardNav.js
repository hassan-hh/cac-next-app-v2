import { faHome, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const DashboardNav = () => {

    return (
        <nav className="bg-white py-6 px-6 lg:px-14 shadow-xl">
            <div className="flex justify-start">
                {/* <div className="px-4"><FontAwesomeIcon icon={faQuestion} size="xs" color="lightGray" width="15px"/></div>
                <div><FontAwesomeIcon icon={faHome} size="xs" color="lightGray" width="25px"/></div> */}
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