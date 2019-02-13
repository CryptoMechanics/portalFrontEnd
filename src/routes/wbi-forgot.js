import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
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
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.svg">
          <hr>
          <h2>Forgot password</h2>
          <p>Enter your email address and we'll send you a password reset link.</p>
          <label for="email">Email address</label>
          <input type="text" name="email" id="email" value="{{email::input}}">
          <button type="button" class="green-bg" on-click="_send">Send Reset Link</button>
          <button type="button" class="white-bg" on-click="_signIn">Back To Sign In</button>
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
      },
      mode: {
        type: String,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
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

  _signIn() {
    this.set('route.path', '/signin');
  }
  _send() {
    this.set('route.path', '/sent');
  }
} window.customElements.define('wbi-forgot', WbiForgot);
