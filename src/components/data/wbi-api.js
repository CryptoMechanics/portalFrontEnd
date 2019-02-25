import {createMixin} from 'polymer-redux';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';


const ReduxMixin = createMixin(store);
class WbiApi extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
    };
  }

  join(email, password, agreedTerms, agreedMarketing) {
    const url = `${this.env.apiUrl}/visitor/join/`;
    const data = {email, password, agreedTerms, agreedMarketing};
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  signIn(email, password) {
    const url = `${this.env.apiUrl}/user/login/`;
    const data = {email, password};
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  forgotPassword(email) {
    const url = `${this.env.apiUrl}/visitor/reset/`;
    const data = {email};
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  uploadImage(file) {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('image', file);
    const url = `${this.env.apiUrl}/kyc/image/`;
    console.log(data);
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  getImage(file) {
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append('image', file);
    const url = `${this.env.apiUrl}/kyc/img/`;
    console.log(data);
    fetch(url, {
      method: 'GET',
      body: formData,
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  kycApplication(country, nameFirst, nameLast, dob, gender) {
    const token = localStorage.getItem('jwt');
    const data = {country, nameFirst, nameLast, dob, gender};
    const url = `${this.env.apiUrl}/kyc/application/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log('Error:', error));
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }
} window.customElements.define('wbi-api', WbiApi);
