import styles from '../styles/Footer.module.css'

const Footer = () => {

    return (
        <footer className={styles.footer}>
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