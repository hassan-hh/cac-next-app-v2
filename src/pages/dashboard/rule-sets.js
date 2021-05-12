import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import Link from 'next/link'

const RuleSets = () => {
    return (
        <>
            <Meta title="Rule Set Administation" />
            <Header title="Rule Set Administation" subTitle="" />
            <Link href="#">
                <a  className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm mr-3 px-4 py-2 rounded-md text-sm font-medium">Add Section</a>
            </Link>
            <Link href="#">
                <a className="bg-gray-900 text-white transition-all ease-in-out duration-300 uppercase shadow-sm px-8 py-2 rounded-md text-sm font-medium">Save</a>
            </Link>
        </>
    )
}
export default RuleSets