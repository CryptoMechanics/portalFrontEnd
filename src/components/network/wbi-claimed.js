import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiClaimed extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
        div {
          display: block;
          background-color: #fdb8ba3b;
          height: 47px;
          line-height: 46px;
          text-align: center;
          border: 1px solid #AE464A;
          border-radius: 4px;
          color: #AE464A;
          font-size: 15px;
          font-weight: 400;
        }
        a {
          text-decoration: none;
        }

      </style>
      <div>Your WORBLI blockchain account has been created</div>
      <p>Check it out at <a href="http://worbli.bloks.io" target="_blank">worbli.bloks.io</a></p>
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
} window.customElements.define('wbi-claimed', WbiClaimed);
