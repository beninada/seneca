import history from './history';
import autoBind from 'react-autobind';
import rootStore from './rootStore';

export default class auth {
  constructor() {
    autoBind(this);
  }

  static login() {
    fetch('/api/auth/login', {
      method: 'POST',
    })
    .then((res) => res.json())
    .then((res) => {
      rootStore.liu = res;
      history.replace('/');
    }).error((a, b) => {
      console.error('Login error');
      alert('Sorry, there was an error logging you in. Please try again.')
    })
  }

  static logout() {
    fetch('/api/auth/logout', {
      method: 'POST',
    }).success((res) => {
      rootStore.liu = {};
      history.replace('/');
    }).error((a, b) => {
      console.error('Logout error');
      alert('Sorry, there was an error logging you out. Please try again.')
    })
  }

  static check() {
    fetch('/api/auth/check', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.id) {
        rootStore.liu = res;
      }
      
      return rootStore.liu;
    });
  }
}
