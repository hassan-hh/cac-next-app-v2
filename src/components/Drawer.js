import { useContext } from 'react'
import { DrawerContext } from '../providers/DrawerContext'
import ErrorLoadingData from './ErrorLoadingData'
import LoadingSpinner from './LoadingSpinner'

const Drawer = () => {

    const { systemDate, accountEntity, loading } = useContext(DrawerContext)
    const displayText = 'System Date' 
    const zeroPad = (number) => number.toString().length === 1 ? `0${number}` : number
    const date = new Date(systemDate)
    const day = zeroPad(date.getDate())
    const month = date.toLocaleString('default', { month: 'short' });
    const formatedDate = `${displayText} ${day} ${month} ${date.getFullYear()}`

    console.log('drawer-date', systemDate) 
    console.log('drawer-account', accountEntity)
    console.log('drawer-loading', loading)

    return (
        <div className="flex flex-col justify-between h-80 p-4">
            {   loading ?
                <LoadingSpinner />
                :
                <>
                    <p className="w-48" key="date">{systemDate && formatedDate}</p>
                    <div class="relative inline-flex">
                        <svg class="w-3 h-3 absolute top-0 right-2 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero" /></svg>
                        <select class="w-56 border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                            {accountEntity.map(account => {
                                return (
                                    account.entities.filter(e => e.id !== null)
                                        .map(entity => {
                                            return (
                                                <option
                                                    key={entity.id}
                                                    selected={account.defaultIdEntity === entity.name ? 'selected' : undefined}
                                                >
                                                    {entity.name}
                                                </option>
                                            )
                                    })
                                )
                            })}
                        </select>
                    </div>
                </>
            }
        </div>
    )
}
export default Drawer