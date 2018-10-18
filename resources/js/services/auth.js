import history from './history';
import autoBind from 'react-autobind';
import rootStore from './rootStore';
import axios from 'axios';

export default class auth {
  constructor() {
    autoBind(this);
  }

  static signup(user) {
    return axios.post('/api/auth/register', {
      email: user.email,
      password: user.password,
      f_name: user.f_name,
      l_name: user.l_name,
      u_name: user.u_name,
    })
    .then(res => {
      rootStore.liu = res.data;
      return rootStore.liu;
    }, res => {
      alert('Sorry, there was a problem signing you up. Please clear your cookies and cache, then try again.')
      console.error('Signup error', res);
    })
  }

  static login(user) {
    return axios.post('/api/auth/login', {
      email: user.email,
      password: user.password,
    })
    .then(res => {
      rootStore.liu = res.data;
      return rootStore.liu;
    })
    .catch(err => {
      alert('Sorry, there was a problem logging you in. Please clear your cookies and cache, then try again.')
      console.error('Login error', err);
    });
  }

  static logout() {
    return axios.post('/api/auth/logout')
    .then(res => {
      rootStore.liu = {};
      return rootStore.liu;
    })
    .catch(err => {
      alert('Sorry, there was a problem logging you out. Please clear your cookies and cache, then try again.')
      console.error('Logout error', err);
    });
  }

  static check() {
    return axios.get('/api/auth/check')
    .then((res) => {
      if (res.data && res.data.id) {
        rootStore.liu = res.data;
      }
      
      return rootStore.liu;
    }, res => {
      console.error('Auth check error', res);
    });
  }
}
