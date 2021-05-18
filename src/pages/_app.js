import { StoreProvider } from '../providers/StoreContext'
import Layout from '../components/Layout';
import '../styles/globals.css'
import '../styles/index.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  return (
    <StoreProvider>
      <Layout>
          <Component {...pageProps} />
        </Layout>
    </StoreProvider>
  )
}
export default MyApp