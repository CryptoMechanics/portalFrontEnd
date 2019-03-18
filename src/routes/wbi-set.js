import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSet extends ReduxMixin(PolymerElement) {
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
          <h2>Set new password</h2>
          <label for="password">[[txt.password]]</label>
          <input type="password" name="password" id="password" value="{{password::input}}" on-keyup="_password" on-paste="_password">
          <label for="password">Confirm password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value="{{confirmPassword::input}}" on-keyup="_confirmPassword" on-paste="_confirmPassword">
          <button type="button" class="green-bg" on-click="_setPassword">Set new password & login</button>
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
      token: {
        type: String,
      },
      color: {
        type: Object,
        readOnly: true,
      },
      focus: {
        type: Boolean,
        value: true,
        observer: '_focusPassword',
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
      color: state.color,
      env: state.env,
    };
  }

  _routeChanged() {
    this.token = this.route.__queryParams.token;
  }
  _validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*\d|.*[!@#\$%\^&\*])(?=.*[A-Z])(?:.{8,})$/;
    return re.test(password);
  }
  _focusPassword() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#password').focus();
    }, 0);
  }
  _password(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#confirmPassword').focus();
    }
  }
  _confirmPassword(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this._setPassword();
    }
  }
  _isComplete() {
    if (this._validatePassword(this.password) && this._validatePassword(this.confirmPassword) && this.password === this.confirmPassword) {
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
  _setPassword() {
    if (this._validatePassword(this.password) && this._validatePassword(this.confirmPassword) && this.password === this.confirmPassword) {
      this.$.api.setPassword(this.password, this.token)
          .then((response) => {
            if (response && response.data === false && response.error) {
              this.error = response.error;
            } else if (response && response.data === true) {
              localStorage.setItem('jwt', response.token);
              this.set('route.path', '/settings');
            }
          });
    }
  }
} window.customElements.define('wbi-set', WbiSet);
