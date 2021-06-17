import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import PropTypes from 'prop-types'

const TabPanel = props => {

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

const AccountManagement = () => {

    const [value, setValue] = useState(0)
    console.log('value', value)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <div className="bg-white shadow-sm overflow-auto">
                <nav value={value} onChange={handleChange} aria-label="Event View Tabs" className="flex flex-col sm:flex-row">
                    <button
                        onClick={() => setValue(0)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 0 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Entitlements
                    </button>
                    <button
                        onClick={() => setValue(1)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 1 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Event Details
                    </button>
                    <button
                        onClick={() => setValue(2)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 2 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Terms
                    </button>
                    <button
                        onClick={() => setValue(3)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 3 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Attachments
                    </button>
                    <button
                        onClick={() => setValue(4)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 4 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Notifications
                    </button>
                    <button
                        onClick={() => setValue(5)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 5 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Exceptions
                    </button>
                    <button
                        onClick={() => setValue(6)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 6 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Lock
                    </button>
                </nav>
            </div>
            <TabPanel key={0} value={value} index={0}>
                <div className="my-5">
                    Entitlements
                </div>
            </TabPanel>
            <TabPanel key={1} value={value} index={1}>
                <div className="my-5">
                    Event Details
                </div>
            </TabPanel>
            <TabPanel key={2} value={value} index={2}>
                <div className="my-5">
                    Terms
                </div>
            </TabPanel>
            <TabPanel key={3} value={value} index={3}>
                <div className="my-5">
                    Attachments
                </div>
            </TabPanel>
            <TabPanel key={4} value={value} index={4}>
                <div className="my-5">
                    Notifications
                </div>
            </TabPanel>
            <TabPanel key={5} value={value} index={5}>
                <div className="my-5">
                    Exceptions
                </div>
            </TabPanel>
             <TabPanel key={6} value={value} index={6}>
                <div className="my-5">
                    Lock
                </div>
            </TabPanel>
        </>
    )
}
export default AccountManagement