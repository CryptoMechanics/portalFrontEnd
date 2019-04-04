import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiApproved extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
        .green-alert {
          background-color: #F2FAF5;
          border: 1px solid #7ECF7D;
          padding: 24px;
          border-radius: 3px;
        }
        .status {
          font-weight: 600;
          margin-top: 48px;
          font-size: 14px;
        }
        .status span{
          font-weight: 600;
          background-color: #4285D4;
          border-radius: 3px;
          color: white;
          padding: 6px 12px;
          margin-left: 12px;
        }
      </style>
      <p class="green-alert">Your identity has been verified.</p>
      <div class="status">Status: <span>Approved</span></div>
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
} window.customElements.define('wbi-approved', WbiApproved);
