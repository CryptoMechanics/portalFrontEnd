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
          margin-top: 12px;
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
        }
        .green-bg{
          background-color: var(--active-color, #BDC1C6);
          cursor: var(--cursor-type, default);
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
        .error {
          color: #AB4949;
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
          <img src="./images/worbli.svg">
          <hr>
          <h2>[[txt.signIn]]</h2>
          <label for="email">[[txt.emailAddress]]</label>
          <input type="text" name="email" id="email" value="{{email::input}}" on-keydown="_email">
          <label for="password">[[txt.password]]</label>
          <input type="password" name="password" id="password" value="{{password::input}}" on-keydown="_password">
          <a on-click="_forgot" class="forgot">[[txt.forgotPassword]]</a>
          <button type="button" class="green-bg" on-click="_signIn">[[txt.signIn]]</button>
          <button type="button" class="white-bg" on-click="_join">[[txt.joinWorbli]]</button>
          <template is="dom-if" if="[[error]]">
            <div class="error">
              <p>[[error]]</p>
            </div>
          </template>
          <div class="bottom">
            <ul><li><img src="./images/language-icon.svg" class="language-icon">English</li></ul>
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
      this.updateStyles({'--cursor-type': 'pointer'});
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      this.updateStyles({'--cursor-type': 'default'});
    }
  }
  _language(e) {
    this.txt = translations[this.language];
  }
  _signIn() {
    this.$.api.signIn(this.email, this.password)
        .then((response) => {
          if (response && response.error) {
            this.error = response.error;
          } else {
            localStorage.setItem('jwt', response.token);
            this.set('route.path', '/settings');
          }
        });
  }
  _join() {
    this.set('route.path', '/join');
  }
  _forgot() {
    this.set('route.path', '/forgot');
  }
} window.customElements.define('wbi-signin', WbiSignin);
