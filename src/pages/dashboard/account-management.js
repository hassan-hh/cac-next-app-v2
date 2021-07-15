import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import PropTypes from 'prop-types'
import AccountRequest from '../../components/dashboard/account-management/AccountRequest'
import ActiveAccounts from '../../components/dashboard/account-management/ActiveAccounts'
import DeactivatedAccounts from '../../components/dashboard/account-management/DeactivatedAccounts'

const TabPanel = props => {

    const { children, value, index, ...other } = props
    
    return (
        <div
            className="relative"
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
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Meta title="Account Management" />
            <Header title="Account Management" subTitle="" />
            <div className="bg-white shadow-sm overflow-auto">
                <nav value={value} onChange={handleChange} aria-label="File Browser Tabs" className="flex flex-col sm:flex-row">
                    <button
                        onClick={() => setValue(0)}
                        className={"md:w-full lg:w-56 py-4 px-6 block hover:text-green-600 "
                        + (value === 0 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Account Requests
                    </button>
                    <button
                        onClick={() => setValue(1)}
                        className={"md:w-full lg:w-56 py-4 px-6 block hover:text-green-600 "
                        + (value === 1 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Active Accounts
                    </button>
                    <button
                        onClick={() => setValue(2)}
                        className={"md:w-full lg:w-56 py-4 px-6 block hover:text-green-600 "
                        + (value === 2 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Deactivated Accounts
                    </button>
                </nav>
            </div>
            <TabPanel key={0} value={value} index={0}>
                <div className="my-5">
                    Account Request
                </div>
                <AccountRequest/>
            </TabPanel>
            <TabPanel key={1} value={value} index={1}>
                <div className="my-5">
                    Active Accounts
                </div>
                <ActiveAccounts/>
            </TabPanel>
            <TabPanel key={2} value={value} index={2}>
                <div className="my-5">
                    Deactivated Accounts
                </div>
                <DeactivatedAccounts/>
            </TabPanel>
        </>
    )
}
export default AccountManagement