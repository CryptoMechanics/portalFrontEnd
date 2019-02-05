import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiForgot extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <div class="card">
        <div>Logo</div>
        <hr>
        <div>Forgot password</div>
        <div>Enter your email address and we'll send you a password reset link.</div>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" value="{{email::input}}"><br>
        <button type="button" on-click="_send">Send Reset Link</button><br>
        <button type="button" on-click="_signIn">Back To Sign In</button><br>
      </div>
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
