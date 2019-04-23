import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/wbi-header.js';
import '../components/wbi-footer.js';
import '../components/data/wbi-api.js';
import '../components/loading/ball-spin.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiProfile extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        } 
        h1 {
          line-height: 28px;
        }
        .header {
          display: flex;
        }  
        .header img{
          margin-right: 12px;
        } 
        hr {
          margin: 24px 0;
        }
        .card {
          max-width: 700px;
        }
        .green-bg{
          background-color: var(--active-color, #BDC1C6);
        }
        ball-spin{
          display: inline-block;
          margin-right: 6px;
          position: relative;
          top: 2px;
        }
        .error {
          padding: 12px 12px;
        }   
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <wbi-header></wbi-header>
      <div class="card">
      <div class="header">
          <img src="./images/profile-header-icon.svg"><h1>My profile</h1>
        </div>
        <hr>


          <label for="email">Email address</label>
          <input type="text" name="email" id="email" value="{{email::input}}" readonly>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" value="{{password::input}}" on-keyup="_password">
          <label for="newPassword">New password</label>
          <input type="password" name="newPassword" id="newPassword" value="{{newPassword::input}}" on-keyup="_newPassword">
          <label for="confirmNewPassword">Confirm new password</label>
          <input type="password" name="confirmNewPassword" id="confirmNewPassword" value="{{confirmNewPassword::input}}" on-keyup="_confirmNewPassword">
          <template is="dom-if" if="{{!loading}}">
            <button type="button" class="green-bg" on-click="_save">Save Changes</button><br>
          </template>
          <template is="dom-if" if="{{loading}}">
            <button type="button" class="green-bg"><ball-spin></ball-spin>Loading</button><br>
          </template>
          <template is="dom-if" if="{{error}}">
            <p class="error">[[error]]</p>
          </template>
   


      </div>
      <wbi-footer></wbi-footer>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
      language: {
        type: String,
        readOnly: true,
      },
      mode: {
        type: String,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
      },
      route: {
        type: Boolean,
        observer: '_routeChanged',
      },
      loading: {
        type: Boolean,
        value: false,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      email: state.email,
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }

  ready() {
    super.ready();
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.dispatchAction({
        type: 'CHANGE_EMAIL',
        email: this.email,
      });
      setTimeout(() => {
        this.shadowRoot.querySelector('#email').focus();
      }, 0);
    } else {
      this.$.api.getEmail()
          .then((response) => {
            if (response.data === false && response.error) {
              this.error = response.error;
            } else {
              localStorage.setItem('email', response.email);
              this.dispatchAction({
                type: 'CHANGE_EMAIL',
                email: response.email,
              });
            }
          });
    }
    this._routeChanged();
  }
  _routeChanged() {
    this.password = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  _validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*\d|.*[!@#\$%\^&\*])(?=.*[A-Z])(?:.{8,})$/;
    return re.test(password);
  }
  _email(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#password').focus();
    }
  }
  _password(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#newPassword').focus();
    }
  }
  _newPassword(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#confirmNewPassword').focus();
    }
  }
  _confirmNewPassword() {
    this._isComplete();
  }
  _isComplete() {
    if (this._validatePassword(this.password) && this._validatePassword(this.newPassword) && this._validatePassword(this.confirmNewPassword) && this.newPassword === this.confirmNewPassword) {
      this.updateStyles({'--active-color': '#92CC7F'});
      return true;
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      return false;
    }
  }
  _save() {
    this.error = '';
    if (this._isComplete()) {
      this.loading = true;
      this.$.api.profile(this.password, this.newPassword)
          .then((response) => {
            this.loading = false;
            if (response.data === false && response.error) {
              this.error = response.error;
            } else {
              this.set('route.path', '/');
            }
          });
    } else {
      if (!this._validatePassword(this.password)) {
        this.error = 'Invalid password';
      } else if (!this._validatePassword(this.newPassword)) {
        this.error = 'Invalid new password';
      } else if (this.newPassword !== this.confirmNewPassword) {
        this.error = 'Passwords dont match';
      }
    }
  }
} window.customElements.define('wbi-profile', WbiProfile);
