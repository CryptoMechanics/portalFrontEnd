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
      apiUrl: {
        type: String,
      },
    };
  }

  ready() {
    super.ready();
    const key = window.location.hostname.split('.')[0];
    this.apiUrl = 'http://portal-api.localhost:9000/api/v3';
    if (window.location.hostname == 'portal.stage.worbli.io') {
      this.apiUrl = 'https://portal-api.stage.worbli.io/api/v3';
    } else if (window.location.hostname == 'portal.dev.worbli.io') {
      this.apiUrl = 'https://portal-api.dev.worbli.io/api/v3';
    } else if (key === 'dev' || key === '127') {
      this.apiUrl = 'https://portal-api.dev.worbli.io/api/v3';
    } else if (key === 'uat') {
      this.apiUrl = 'https://uat-api.worbli.io/api/v3';
    } else if (key === 'portal') {
      this.apiUrl = 'https://portal-api.worbli.io/api/v3';
    } else if (key === 'portal-stage') {
      this.apiUrl = 'https://portal-api-stage.worbli.io/api/v3';
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
      const url = `${this.apiUrl}/visitor/join/`;
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
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {

          });
    });
  }

  /**
 * Resend email
 * @param {string} email - guests email address
 * @return {Object} data and error - response
 */
  resend(email) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/user/resendverify/`;
      const data = {email};
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
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
      const url = `${this.apiUrl}/visitor/signin/`;
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
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
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
      const url = `${this.apiUrl}/visitor/forgot/`;
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
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * Guests has forgotten password
 * @param {token} token - guests email address
 * @return {boolean} password - guests password
 */
  verify(token) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/user/verify/`;
      const data = {token};
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  /**
 * User sets a new password
 * @param {string} password - guests new password
 * @param {string} token - guests token they gtom from the reset email
 * @return {boolean} password - guests password
 */
  setPassword(password, token) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/user/password/`;
      const data = {password, token};
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * Check acount name is available on chain
 * @param {string} accountName - guests token they gtom from the reset email
 * @param {string} token - guests token they gtom from the reset email
 * @return {boolean} true/false - if acocunt is or is nor avail
 */
  checkAccountName(accountName) {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/network/check/${accountName}`;
      fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * Create an on chain account
 * @param {string} accountName - guests token they gtom from the reset email
 * @param {string} publicKeyOwner - publicKeyOwner token they gtom from the reset email
 * @param {string} publicKeyActive - publicKeyActive token they gtom from the reset email
 * @return {boolean} true/false - if acocunt is or is nor avail
 */
  createAccount(accountName, publicKeyOwner, publicKeyActive) {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem('jwt');
      const data = {accountName, publicKeyOwner, publicKeyActive};
      const url = `${this.apiUrl}/network/account/`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            resolve(false);
          });
    });
  }

  /**
 * User sets profile
 * @param {string} password - users email
 * @param {string} newPassword - the password the user wants to have
 * @return {boolean} true/false - was it saved or not
 */
  profile(password, newPassword) {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/user/profile/`;
      const data = {password, newPassword};
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  /**
 * Gets User Email
 * @return {string} users email
 */
  getEmail() {
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/user/profile/`;
      fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }


  /**
 * Upload an image
 * @param {file} file - file blob
 * @param {string} fileType - tyoe of file 'passport-front'
 * @param {string} country - country
 * @return {object} arrays showsg what uploaded and whats missing
 */
  uploadImage(file, fileType) {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      console.log('setting new device id');
      deviceId = Math.floor(Math.random() * 1000000000);
      localStorage.setItem('deviceId', deviceId);
    }
    const fileName = `${deviceId}_${fileType}`;
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const formData = new FormData();
      formData.append(fileName, file, deviceId);
      const url = `${this.apiUrl}/identity/image/`;
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  /**
 * onfido application
 * @param {String} country - String blob
 * @param {String} firstName - String blob
 * @param {String} middleName - String blob
 * @param {String} lastName - String blob
 * @param {String} day - String blob
 * @param {String} month - String blob
 * @param {String} year - String blob
 * @param {String} gender - String blob
 * @param {String} addressOne - String
 * @param {String} addressTwo - String
 * @param {String} addressThree - String
 * @param {String} locationCountry - String
 * @param {String} zipPostal - String
 * @param {String} city - String
 * @param {String} state - String
 * @param {String} dialingCode - String
 * @param {String} telephoneNumber - String
 * @return {object} arrays showsg what uploaded and whats missing
 */
  application(country, firstName, middleName, lastName, day, month, year, gender, addressOne, addressTwo, addressThree, locationCountry, zipPostal, city, state, dialingCode, telephoneNumber) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const data = {country, firstName, middleName, lastName, day, month, year, gender, addressOne, addressTwo, addressThree, locationCountry, zipPostal, city, state, dialingCode, telephoneNumber};
      const url = `${this.apiUrl}/identity/application/`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }

  /**
 * Delete an image
 * @param {string} fileType - tyoe of file 'passport-front'
* @return {object} arrays shows
 */
  deleteImage(fileType) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/identity/image/${fileType}`;
      fetch(url, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => console.log('Error:', error));
    });
  }

  /**
 * Delete all identity images
 * @param {string} fileType - tyoe of file 'passport-front'
 * @return {object} arrays shows
 */
  deleteAll() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/identity/identityimages/`;
      fetch(url, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => console.log('Error:', error));
    });
  }


  /**
 * Get an image
 * @param {string} fileType - tyoe of file 'passport-front'
 */
  getImage(fileType) {
    const token = localStorage.getItem('jwt');
    const url = `${this.apiUrl}/kyc/img/`;
    fetch(url, {
      method: 'GET',
      body: fileType,
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
            localStorage.clear();
            this.set('route.path', '/signin/jwtexpired');
          } else {
            resolve(response);
          }
        })
        .catch((error) => console.log('Error:', error));
  }

  /**
 * Send Kyc application
 * @param {string} country - guests country
 * @param {string} nameFirst - guests first name
 * @param {string} nameLast - guests last name
 * @param {string} dob - guests date of birth
 * @param {string} gender - guests gender
 */
  kycApplication(country, nameFirst, nameLast, dob, gender) {
    const token = localStorage.getItem('jwt');
    const data = {country, nameFirst, nameLast, dob, gender};
    const url = `${this.apiUrl}/kyc/application/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Authorization': `Bearer ${token}`},
    })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
            localStorage.clear();
            this.set('route.path', '/signin/jwtexpired');
          } else {
            resolve(response);
          }
        })
        .catch((error) => console.log('Error:', error));
  }

  /**
 * Send Files and country to Mobile
 * @param {string} country - guests country
 * @param {string} fileArray - guests country
 * @return {object} object
 */
  sendFilesToMobile(country, fileArray) {
    return new Promise((resolve, reject) => {
      const files = fileArray;
      const token = localStorage.getItem('jwt');
      const data = {country, files};
      const url = `${this.apiUrl}/mobile/files/`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    });
  }

  /**
 * Send Shortcode
 * @param {string} number - guests country
 * @param {string} country - guests country
 * @param {array} fileArray - array of files needed
 * @param {string} message - array of files needed
 * @return {object} object
 */
  sendShortcode(number) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const data = {number};
      const url = `${this.apiUrl}/mobile/sms/`;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data === false && response.error === 'Authentication failed: credentials wrong or missing.') {
              localStorage.clear();
              this.set('route.path', '/signin/jwtexpired');
            } else {
              resolve(response);
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    });
  }

  /**
 * Get a users status
 * @param {string} fileType - tyoe of file 'passport-front'
 * @return {object} arrays showsg what uploaded and whats missing
 */
  getStatus() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/user/state/`;
      fetch(url, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => console.log('Error:', error));
    });
  }

  /**
 * swap token for shortcode
 * @param {string} shortcode - tyoe of file 'passport-front'
 * @return {object} arrays showsg what uploaded and whats missing
 */
  swapToken(shortcode) {
    return new Promise((resolve, reject) => {
      const data = {shortcode};
      const url = `${this.apiUrl}/mobile/shortcode/`;
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
          .catch((error) => console.log('Error:', error));
    });
  }

  /**
 * swap token for shortcode
 * @param {string} shortcode - tyoe of file 'passport-front'
 * @return {object} arrays showsg what uploaded and whats missing
 */
  getShortcode() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('jwt');
      const url = `${this.apiUrl}/mobile/shortcode/`;
      fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => console.log('Error:', error));
    });
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
