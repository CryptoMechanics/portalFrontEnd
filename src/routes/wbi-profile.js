import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/wbi-header.js';
import '../components/wbi-footer.js';
import '../components/data/wbi-api.js';

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
          cursor: var(--cursor-type, default);
          pointer-events: var(--pointer-event, none);
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
        <button type="button" class="green-bg" on-click="_save">Save Changes</button><br>
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
      focus: {
        type: Boolean,
        value: true,
        observer: '_focusEmail',
      },
      route: {
        type: Boolean,
        observer: '_routeChanged',
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
  _routeChanged() {
    console.log('route changed');
    this.$.api.getEmail()
        .then((response) => {
          console.log(response);
          if (response.data === false && response.error) {
            this.error = response.error;
          } else {
            this.email = reponse.email;
            this.dispatchAction({
              type: 'CHANGE_EMAIL',
              email: this.email,
            });
          }
        });
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
      this.updateStyles({'--cursor-type': 'pointer'});
      this.updateStyles({'--pointer-event': 'auto'});
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      this.updateStyles({'--cursor-type': 'default'});
      this.updateStyles({'--pointer-event': 'none'});
    }
  }
  _focusEmail() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#email').focus();
    }, 0);
  }
  _save() {
    if (this.email, this._validatePassword(this.password) && this._validatePassword(this.newPassword) && this._validatePassword(this.confirmNewPassword) && this.newPassword === this.confirmNewPassword) {
      this.$.api.profile(this.email, this.password, this.newPassword)
          .then((response) => {
            if (response.data === false && response.error) {
              this.error = response.error;
            } else {
              this.set('route.path', '/');
            }
          });
    }
  }
} window.customElements.define('wbi-profile', WbiProfile);
