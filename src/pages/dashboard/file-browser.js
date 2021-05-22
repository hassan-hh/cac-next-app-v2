import { useState } from 'react'
// import DashboardNav from '../../components/dashboard/DashboardNav'
import Header from '../../components/dashboard/Header'
import Meta from '../../components/seo/Meta'
import PropTypes from 'prop-types';


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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

const FileBrowser = () => {

    const [value, setValue] = useState(0)
    console.log('value', value)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
            <>
                <Meta title="File Browser"/>
                {/* <DashboardNav/> */}
                <Header title="File Browser" subTitle="" />
                <div className="bg-white shadow-sm">
                    <nav value={value} onChange={handleChange} aria-label="File Browser Tabs" className="flex flex-col sm:flex-row">
                        <button
                        onClick={() => setValue(0)}
                        //{...a11yProps(0)}
                        className={"md:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 0 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                            User Files
                        </button>
                        <button
                        onClick={() => setValue(1)}
                        //{...a11yProps(1)}
                        className={"md:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 1 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                            Log Files
                        </button>
                        <button
                            onClick={() => setValue(2)}
                            //{...a11yProps(2)}
                        className={"md:w-48 py-4 px-6 block hover:text-green-600 "
                        + (value === 2 ? "text-green-600 border-b-2 border-green-600 focus:outline-none " : "text-gray-600 border-b-2 border-white focus:outline-none ")}>
                            Feed Files
                        </button>
                    </nav>
                </div>
                <div className="my-5">
                    <TabPanel value={value} index={0}>
                        User Files
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Log Files
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Feed Files
                    </TabPanel>
                </div> 
                <div className="h-screen max-w-full">
                    <table className="h-screen min-w-full divide-y divide-gray-200 shadow-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                    File Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                    Last Modified
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                                    Size
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
    )
}
export default FileBrowser