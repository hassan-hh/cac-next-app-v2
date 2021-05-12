const Footer = ({ loggedIn }) => {

    return (
        <footer className={`${loggedIn ? 'text-gray-900' : 'text-white'} text-lg h-40 flex items-center justify-center`}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Corporate Action Company{' '}
          {/* <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} /> */}
        </a>
      </footer>
    )
}
export default Footer