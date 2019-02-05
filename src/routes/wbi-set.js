import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSet extends ReduxMixin(PolymerElement) {
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
        <div>Set new password</div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="{{password::input}}"><br>
        <label for="confirmPassword">confirmPassword</label>
        <input type="confirmPassword" name="confirmPassword" id="confirmPassword" value="{{confirmPassword::input}}"><br>
        <button type="button" on-click="_set">Set New Password & Login</button><br>

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

  _set() {
    this.set('route.path', '/home');
  }
} window.customElements.define('wbi-set', WbiSet);
