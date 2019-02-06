import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../../css/shared-styles.js';
import '../../components/wbi-header.js';
import '../../components/wbi-footer.js';

import store from '../../global/store.js';
const ReduxMixin = createMixin(store);

class WbiProfile extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }        
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
        My Profile
        <hr>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" value="{{email::input}}"><br>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="{{password::input}}"><br>
        <label for="newPassword">newPassword</label>
        <input type="newPassword" name="newPassword" id="newPassword" value="{{newPassword::input}}"><br>
        <label for="confirmNewPassword">confirmNewPassword</label>
        <input type="confirmNewPassword" name="confirmNewPassword" id="confirmNewPassword" value="{{confirmNewPassword::input}}"><br>
        <button type="button" on-click="_save">Save Changes</button><br>
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

  _save() {
    console.log('saving');
  }
} window.customElements.define('wbi-profile', WbiProfile);
