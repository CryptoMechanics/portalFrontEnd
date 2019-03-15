import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiForgot extends ReduxMixin(PolymerElement) {
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
        p {
          margin-bottom: 32px;
        }
        .green-bg{
          background-color: var(--active-color, #BDC1C6);
          cursor: var(--cursor-type, default);
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
          <h2>[[txt.forgotPassword]]</h2>
          <p>[[txt.forgotPasswordIntro]]</p>
          <label for="email">[[txt.emailAddress]]</label>
          <input type="text" name="email" id="email" value="{{email::input}}" on-keyup="_email" on-paste="_email">
          <button type="button" class="green-bg" on-click="_send">[[txt.sendResetLink]]</button>
          <button type="button" class="white-bg" on-click="_signIn">[[txt.backToSignIn]]</button>
          <p>[[error]]</p>
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
      email: {
        type: String,
        value: true,
        observer: '_email',
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
      email: state.email,
    };
  }
  _email(e) {
    this._isComplete();
    if (this.email && e.keyCode === 13 && this._validateEmail(this.email)) {
      this._send();
    }
  }
  _isComplete() {
    if (this._validateEmail(this.email)) {
      this.updateStyles({'--active-color': '#92CC7F'});
      this.updateStyles({'--cursor-type': 'pointer'});
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      this.updateStyles({'--cursor-type': 'default'});
    }
  }
  _focusEmail() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#email').focus();
    }, 0);
  }
  _validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  _language(e) {
    this.txt = translations[this.language];
  }
  _signIn() {
    this.set('route.path', '/signin');
  }
  _send() {
    if (this.email) {
      this.$.api.forgotPassword(this.email)
          .then((response) => {
            if (response && response.data === false && response.error) {
              this.error = response.error;
            } else {
              this.dispatchAction({
                type: 'CHANGE_EMAIL',
                email: this.email,
              });
              this.set('route.path', '/sent');
            }
          });
    }
  }
} window.customElements.define('wbi-forgot', WbiForgot);
