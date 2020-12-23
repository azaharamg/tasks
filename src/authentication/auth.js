import axios from 'axios';
import Cookies from 'js-cookie';

const ENDPOINT_PATH = 'https://reqres.in/api/';

export default {
  setUserLogged(userLogged) {
    Cookies.set('userLogged', userLogged);
  },
  getUserLogged() {
    const user = Cookies.get('userLogged');
    return JSON.parse(user);
  },
  deleteUserLogged() {
    Cookies.remove('userLogged');
  },
  register(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + 'regiser', user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + 'login', user);
  },
};
