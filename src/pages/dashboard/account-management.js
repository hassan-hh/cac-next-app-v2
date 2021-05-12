import { useState } from 'react'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import PropTypes from 'prop-types';
import AccountRequest from '../../components/dashboard/account-management/AccountRequest'
import ActiveAccounts from '../../components/dashboard/account-management/ActiveAccounts'
import DeactivatedAccounts from '../../components/dashboard/account-management/DeactivatedAccounts'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
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
            <p>{children}</p>
            </>
        )}
        </div>
    );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const AccountManagement = () => {

    const [value, setValue] = useState(0)
    console.log('value', value)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Meta title="Account Management" />
            <Header title="Account Management" subTitle="" />
            <div className="bg-white shadow-sm">
                <nav value={value} onChange={handleChange} aria-label="File Browser Tabs" className="flex flex-col sm:flex-row">
                    <button
                        onClick={() => setValue(0)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 0 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Account Requests
                    </button>
                    <button
                        onClick={() => setValue(1)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 1 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Active Accounts
                    </button>
                    <button
                        onClick={() => setValue(2)}
                        className={"py-4 px-6 block hover:text-green-600 "
                        + (value === 2 ? "text-green-600 border-b-2 border-green-600 focus:outline-none" : "text-gray-600 border-b-2 border-white focus:outline-none")}>
                        Deactivated Accounts
                    </button>
                </nav>
            </div>
            <TabPanel value={value} index={0}>
                <div className="my-5">
                    Account Request
                </div>
                <AccountRequest />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="my-5">
                    Active Accounts
                </div>
                <ActiveAccounts />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className="my-5">
                    Deactivated Accounts
                </div>
                <DeactivatedAccounts />
            </TabPanel>
            {/* <div className="h-screen max-w-full">
                <table className="h-screen min-w-full divide-y divide-gray-200 shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                Phone
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                            <td className="px-6 py-4">
                                <p></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </>
    )
}
export default AccountManagement