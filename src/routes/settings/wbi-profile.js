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
        h1 {
          line-height: 28px;
        }
        .header {
          display: flex;
        }  
        .header img{
          margin-right: 12px;
        } 
        hr {
          margin: 24px 0;
        }           
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
      <div class="header">
          <img src="./images/profile-header-icon.svg"><h1>My profile</h1>
        </div>
        <hr>
        <label for="email">Email address</label>
        <input type="text" name="email" id="email" value="{{email::input}}">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="{{password::input}}">
        <label for="newPassword">New password</label>
        <input type="password" name="newPassword" id="newPassword" value="{{newPassword::input}}">
        <label for="confirmNewPassword">Confirm new password</label>
        <input type="password" name="confirmNewPassword" id="confirmNewPassword" value="{{confirmNewPassword::input}}">
        <button type="button" class="green-bg" on-click="_save">Save Changes</button><br>
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
