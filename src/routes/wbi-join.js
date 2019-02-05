import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiJoin extends ReduxMixin(PolymerElement) {
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
        <div>Join</div>
        
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" value="{{email::input}}"><br>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="{{password::input}}"><br>
        <label for="repeat_password">Repeat Password</label>
        <input type="password" name="repeat_password" id="repeat_password" value="{{repeat_password::input}}"><br>

        <label for="agree">I agree to the Terms and Privacy Policy</label>
        <input type="checkbox" name="agree" id="agree" value="{{agree::input}}"><br>
        <label for="optIn">I would like to opt in to marketing communications</label>
        <input type="checkbox" name="optIn" id="optIn" value="{{optIn::input}}"><br>
        
        <button type="button" on-click="_join">Join</button><br>
        <p>Already on WORBLI? <a on-click="_signIn">Sign In</a></p><br>
        <a>back to worbli.io</a>

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
    this.set('route.path', '/sent');
  }
} window.customElements.define('wbi-join', WbiJoin);
