import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import PropTypes from 'prop-types'
import UserFiles from '../../components/dashboard/file-browser/UserFiles'
import LogFiles from '../../components/dashboard/file-browser/LogFiles'
import FeedFiles from '../../components/dashboard/file-browser/FeedFiles'

function TabPanel(props) {

    const { children, value, index, ...other } = props
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

const FileBrowser = () => {

    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Meta title="File Browser"/>
            <Header title="File Browser" subTitle="" />
            <div className="bg-white shadow-sm overflow-auto">
                <nav value={value} onChange={handleChange} aria-label="File Browser Tabs" className="flex flex-col sm:flex-row">
                    <button
                        onClick={() => setValue(0)}
                        className={"md:w-full lg:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 0 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                        User Files 
                    </button>
                    <button
                        onClick={() => setValue(1)}
                        className={"md:w-full lg:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 1 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                        Log Files
                    </button>
                    <button
                        onClick={() => setValue(2)}
                        className={"md:w-full lg:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 2 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                        Feed Files
                    </button>
                </nav>
            </div>
            <TabPanel key={0} value={value} index={0}>
                <div className="my-5">
                    User Files
                </div>
                <UserFiles />
            </TabPanel>
            <TabPanel key={1} value={value} index={1}>
                <div className="my-5">
                    Log Files
                </div>
                <LogFiles />
            </TabPanel>
            <TabPanel key={2} value={value} index={2}>
                <div className="my-5">
                    Feed Files
                </div>
                <FeedFiles />
            </TabPanel>
        </>
    )
}
export default FileBrowser