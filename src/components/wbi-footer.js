import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../css/shared-styles.js';
import './wbi-social.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiFooter extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
        .footer {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
        }
        div {
          margin-top: 24px;
          flex: 1;
        }
        .social{
          flex: none;
        }
      </style>
      <div class="footer">
        <div>Ⓒ 2018 Worbli Pty Ltd. All rights reserved.</br> View our Terms and Privacy Policy</div>
        <div>491B River Valley Road #15-01 Valley Point</br>Singapore 248373</div>
        <div class="social"><wbi-social></wbi-social></div>
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
} window.customElements.define('wbi-footer', WbiFooter);
