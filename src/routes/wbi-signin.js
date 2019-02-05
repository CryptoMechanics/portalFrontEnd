import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSignin extends ReduxMixin(PolymerElement) {
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
        <div>Sign In</div>
        
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" value="{{email::input}}"><br>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="{{password::input}}"><br>
        
        <a on-click="_forgot">Forgot password?</a><br>
        <button type="button" on-click="_signIn">Sign In</button><br>
        <button type="button" on-click="_join">Join Worbli</button><br>
        <a href="http://www.worbli.io">back to worbli.io</a>

        <ul>
          <li>English</li>
        </ul>

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
  _join() {
    this.set('route.path', '/join');
  }
  _forgot() {
    this.set('route.path', '/forgot');
  }
} window.customElements.define('wbi-signin', WbiSignin);
