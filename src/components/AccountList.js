import AccountItem from './AccountItem'


const AccountList = ({ entities }) => {

    return (
        <>
           <div className="flex flex-col justify-between h-80 p-4">
                <ul>
                    {entities.map(entity => (
                        <li key={entity.id}>
                            <AccountItem entity={entity}/>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )

}
export default AccountList