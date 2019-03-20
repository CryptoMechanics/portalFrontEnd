import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import store from '../global/store.js';
import '../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiHeader extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          box-shadow: inset 0 1px 0 black, 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
          background-color: white;
          margin-bottom: 24px;
          width: 100%;
          height: 55px;
        }
        ul li {
          display: inline-block
        }
        ul li a {
          font-size: 14px;
          color: #7A7D85;
          line-height: 55px;
          line-height: 30px;
          margin-right: 24px;
        }
        div {
          flex: 1;
        }
        .header {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logout{
          flex: none;
        }
        a {
          text-decoration: none;
        }
        .logo {
          margin-top: 16px;
          height: 25px;
          margin-right: 36px;
          cursor: pointer;
        }
        .main-nav img, .logout img {
          width: 17px;
          margin-right: 8px;
        }
        @media only screen and (max-width: 768px) {
          .main-nav {
            display: none;
          }
          .logo {
            margin-left: 12px;
          }
          :host {
            position: relative;
            top: -1px;
          }
        }

      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <div class="header">
        <img src="./images/worbli.svg" class="logo" on-click="_settings">
        <div class="main-nav">
          <ul>
            <li><a href="/profile/"><img src="./images/profile-icon.svg" style="position: relative; top: 4px;">My profile</a></li>
            <li><a href="/identity/"><img src="./images/identity-icon.svg" style="position: relative; top: 2px;">Identity</a></li>
            <li><a href="/network/"><img src="./images/network-icon.svg" style="position: relative; top: 5px;">Network Account</a></li>
          </ul>
        </div>
        <div class="logout">
          <ul>
            <li><a on-click="_logout"><img src="./images/logout-icon.svg" style="position: relative; top: 3px;">Logout</a></li>
            <li><a on-click="_language"><img src="./images/language-icon.svg" style="position: relative; top: 4px;">English</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      language: {
        type: Text,
        readOnly: true,
      },
      mode: {
        type: Text,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
      },
      env: {
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

  _settings() {
    this.set('route.path', '/');
  }
  _logout() {
    localStorage.removeItem('jwt');
    this.set('route.path', '/signin/');
  }
  _language() {

  }
} window.customElements.define('wbi-header', WbiHeader);
