import { useContext, useState } from 'react'
import { StoreProvider } from '../providers/StoreContext'
import Layout from '../components/Layout';
import '../styles/globals.css'
import '../styles/index.css'
import 'tailwindcss/tailwind.css'
import LoadingSpinner from '../components/dashboard/LoadingSpinner'


function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false)
  //const { loading } = useContext(StoreContext)

  return (
    <StoreProvider>
      <Layout>
        {loading ?
          <div className="h-screen flex items-center justify-center">
            <LoadingSpinner />
          </div>
          :
          <Component {...pageProps} />
        }
        </Layout>
    </StoreProvider>
  )
}
export default MyApp
