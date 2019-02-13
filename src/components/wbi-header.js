import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../global/store.js';
import '../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiHeader extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
          background-color: white;
          margin-bottom: 24px;
        }
        ul li {
          display: inline-block
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

      </style>
      <div class="header">
        <h1>Worbli Portal</h1>
        <div>
          <ul>
            <li><a href="/settings/profile/">My profile</a></li>
            <li><a href="/settings/identity/">Identity</a></li>
            <li><a href="/settings/network/">Network Account</a></li>
          </ul>
        </div>
        <div class="logout">
          <ul>
            <li><a on-click="_logout">Logout</a></li>
            <li><a on-click="_language">English</a></li>
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

  _logout() {
    console.log('logout');
  }
  _language() {
    console.log('language');
  }
} window.customElements.define('wbi-header', WbiHeader);
