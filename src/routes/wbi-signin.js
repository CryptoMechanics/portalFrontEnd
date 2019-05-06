import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSignin extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        img {
          display: block;
          width: 150px;
          margin: 0 auto;
          padding-bottom: 24px;
        }
        h2 {
          display: block;
          text-align: center;
          color: #2B2C54;
          font-weight: 400;
          font-size: 24px;
        }
        .forgot {
          font-size: 14px;
          display: inline-block;
          text-align: left;
          height: 24px;
          line-height: 24px;
          color: #92CC7F;
          margin: 2px 0 24px;
        }
        .bottom{
          display: flex;
          position: relative;
          bottom: -90px;
        }
        ul {
          flex: 1;
          margin: 0px;
          padding: 0px;
        }
        .bottom a{
          color: #92CC7F;
          text-decoration: none;
          font-size: 14px;
          margin-top: 12px;
        }
        .bottom li {
          list-style: none;
          text-transform: capitalize;
        }
        .green-bg {
          margin: auto;
          background-color: var(--active-color, #BDC1C6);
        }
        .white-bg{
          cursor: pointer;
        }
        .language-icon{
          position: absolute;
          width: 20px;
          left: -27px;
          top: -2px;
        }
        .error a{
          text-decoration: underline;
        }
        @media only screen and (max-width: 600px) {
          .card {
            border-radius: 0px;
          }
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.png" alt="[[txt.worbli]]">
          <hr>
          <h2>[[txt.signIn]]</h2>
          <label for="email">[[txt.emailAddress]]</label>
          <input type="text" name="email" id="email" value="{{email::input}}" on-keyup="_email" on-paste="_email">
          <label for="password">[[txt.password]]</label>
          <input type="password" name="password" id="password" value="{{password::input}}" on-keyup="_password" on-paste="_password">
          <a on-click="_forgot" class="forgot">[[txt.forgotPassword]]</a>
          <button type="button" class="green-bg" on-click="_signIn">[[txt.signIn]]</button>
          <button type="button" class="white-bg" on-click="_join">[[txt.joinWorbli]]</button>
          <template is="dom-if" if="[[error]]">
            <div class="error">
              <p>[[error]]</p>
            </div>
          </template>
          <div class="bottom">
            <ul><li><img src="./images/language-icon.svg" class="language-icon" alt="[[txt.changeLanguage]]">[[txt.language]]</li></ul>
            <span><a href="http://www.worbli.io">[[txt.backToWorbli]]</a></span>
          </div>
        </div>
      </wbi-center>
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
        observer: '_language',
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
      error: {
        type: Boolean,
        value: false,
      },
      route: {
        type: Object,
        observer: '_routeChanged',
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }
  _routeChanged() {
    if (this.route.path.split('/')[2] === 'jwtexpired') {
      this.error = this.txt.youHaveBeenLoggedOut;
    };
  }
  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  _validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*\d|.*[!@#\$%\^&\*])(?=.*[A-Z])(?:.{8,})$/;
    return re.test(password);
  }
  _focusEmail() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#email').focus();
    }, 0);
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
      this._signIn();
    }
  }
  _isComplete() {
    if (this._validateEmail(this.email) && this._validatePassword(this.password)) {
      this.updateStyles({'--active-color': '#92CC7F'});
      return true;
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      return false;
    }
  }
  _language(e) {
    this.txt = translations[this.language];
  }
  _signIn() {
    if (this._isComplete()) {
      this.error = '';
      this.$.api.signIn(this.email, this.password)
          .then((response) => {
            if (!response.worbliAccountName) {
              this.dispatchAction({
                type: 'CHANGE_NETWORK',
                network: 'available',
              });
              localStorage.setItem('email', this.email);
              localStorage.setItem('network', 'available');
            } else {
              this.dispatchAction({
                type: 'CHANGE_NETWORK',
                network: 'claimed',
              });
              localStorage.setItem('network', 'claimed');
            }
            this.dispatchAction({
              type: 'CHANGE_STATUS',
              status: response.status,
            });
            localStorage.setItem('status', response.status);
            if (response && response.data === false && response.error) {
              this.error = response.error;
            } else if (response && response.data === true) {
              localStorage.setItem('jwt', response.jwt);
              this.set('route.path', '/');
            }
          });
    } else {
      this.error = '';
      if (!this._validateEmail(this.email)) {
        this.error = this.txt.invalidEmailAddress;
      } else if (!this._validatePassword(this.password) ) {
        this.error = this.txt.invalidPassword;
      }
    }
  }
  _join() {
    this.set('route.path', '/join');
  }
  _forgot() {
    this.dispatchAction({
      type: 'CHANGE_EMAIL',
      email: this.email,
    });
    this.set('route.path', '/forgot');
  }
} window.customElements.define('wbi-signin', WbiSignin);
