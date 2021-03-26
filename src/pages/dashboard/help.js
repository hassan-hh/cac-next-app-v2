import DashboardNav from '../../components/dashboard/DashboardNav'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'

const Help = () => {

    return (
            <>
            <Meta title="Help and Support"/>
               <DashboardNav/>
               <div className="h-screen bg-gray-200 px-14">
                    <Header title="Questions & Answers" subTitle="YOU CAN FIND MORE INFORMATION HERE"/>
               </div>
            </>
    )
}
export default Help