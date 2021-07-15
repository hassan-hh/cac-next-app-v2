import { StoreProvider } from '../providers/StoreContext'
import Layout from '../components/Layout';
import '../styles/globals.css'
import '../styles/index.css'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }) => {

  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}
export default App