import Cookies from 'js-cookie';

export default function getCookie(token) {
    return Cookies.get(token)
}
