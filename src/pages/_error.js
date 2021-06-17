import { useContext } from 'react'
import { StoreContext } from '../providers/StoreContext'

const Error = ({ statusCode }) => {

  const { loggedIn, store } = useContext(StoreContext)

  return (
    <h2 className={`${loggedIn || store ? 'text-black' : 'text-white'}  text-lg h-screen flex items-center justify-center flex-row`}>
      { statusCode === 404 ?
        `Error ${statusCode} page not found`
        : statusCode ? `An error ${statusCode} occurred on server. Try again in 30 seconds.`
        : `An error occurred on client. Try again in 30 seconds.`
      }
    </h2>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
export default Error