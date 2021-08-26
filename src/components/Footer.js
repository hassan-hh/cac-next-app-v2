const Footer = ({ loggedIn }) => {

    return (
      <footer className={`${loggedIn ? 'text-gray-900' : 'text-white'} text-lg h-40 flex flex-col items-center justify-center`}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Corporate Action Company{' '}
        </a>
        <div className="w-56 flex flex-row justify-around pt-5">
          <a
            href="/dashboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </a>
          <a
            href="https://www.corporate-action.com/the_solution/functionality.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solution
          </a>
          <a
            href="https://www.corporate-action.com/the_company/contact.html"
            target="_blank"
            rel="noopener noreferrer"
          >
              Contact
          </a>
        </div>
      </footer>
    )
}
export default Footer