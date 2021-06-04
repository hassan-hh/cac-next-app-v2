// helpers/index.js
import Cookies from 'js-cookie'

    const parseCookies = (req) => {
        return Cookies.parse(req ? req.headers.Cookies || "" : document.Cookies)
    }
export default parseCookies