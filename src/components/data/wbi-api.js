import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '@polymer/app-route/app-location.js';

const ReduxMixin = createMixin(store);
class WbiApi extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
    };
  }

  /**
 * Join Worbli
 * @param {string} email - guests email address
 * @param {string} password - guests password
 * @param {boolean} agreedTerms - agreement of the terms and conditions
 * @param {boolean} agreedMarketing - agreed to recieve marketing materials
 * @return {Object} data and error - response
 */
  join(email, password, agreedTerms, agreedMarketing) {
    return new Promise((resolve, reject) => {
      const url = `${this.env.apiUrl}/visitor/join/`;
      const data = {email, password, agreedTerms, agreedMarketing};
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    });
  }


  /**
 * SignIn to Worbli
 * @param {string} email - guests email address
 * @param {string} password - guests password
 * @return {boolean} password - guests password
 */
  signIn(email, password) {
    return new Promise((resolve, reject) => {
      const url = `${this.env.apiUrl}/visitor/signin/`;
      const data = {email, password};
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false) {
              resolve(false);
            } else if (response.data === true) {
              const jwt = response.token;
              localStorage.setItem('jwt', jwt);
              this.set('route.path', '/settings/');
              resolve(true);
            }
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * Guests has forgotten password
 * @param {email} email - guests email address
 * @return {boolean} password - guests password
 */
  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      const url = `${this.env.apiUrl}/visitor/forgot/`;
      const data = {email};
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
            resolve(true);
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * Upload an image
 * @param {file} file - file blob
 * @param {string} fileType - tyoe of file 'passport-front'
 */
  uploadImage(file, fileType) {
    console.log(file);
    console.log(fileType);
    const token = localStorage.getItem('jwt');
    const formData = new FormData();
    formData.append(fileType, file);
    const url = `${this.env.apiUrl}/kyc/dossier/`;
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

  /**
 * Get an image
 * @param {string} fileType - tyoe of file 'passport-front'
 */
  getImage(fileType) {
    const token = localStorage.getItem('jwt');
    const url = `${this.env.apiUrl}/kyc/img/`;
    fetch(url, {
      method: 'GET',
      body: fileType,
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

  /**
 * Get an image
 * @param {string} country - guests country
 * @param {string} nameFirst - guests first name
 * @param {string} nameLast - guests last name
 * @param {string} dob - guests date of birth
 * @param {string} gender - guests gender
 */
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
