import history from './history';
import autoBind from 'react-autobind';
import rootStore from './rootStore';
import axios from 'axios';

export default class auth {
  constructor() {
    autoBind(this);
  }

  static signup(user) {
    return fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        f_name: user.f_name,
        l_name: user.l_name,
        u_name: user.u_name,
      }),
    })
    .then(res => res.json())
    .then(res => {
      rootStore.liu = res;
      history.replace('/');

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
    return fetch('/api/auth/logout', {
      method: 'POST',
    }).then(res => {
      rootStore.liu = {};
      history.replace('/');

      return rootStore.liu;
    }, res => {
      alert('Sorry, there was a problem logging you out. Please clear your cookies and cache, then try again.')
      console.error('Logout error', res);
    });
  }

  static check() {
    return fetch('/api/auth/check', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.id) {
        rootStore.liu = res;
      }
      
      return rootStore.liu;
    }, res => {
      console.error('Auth check error', res);
    });
  }
}
