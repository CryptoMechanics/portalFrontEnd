import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiCreated extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }

      </style>
      <p>
        Your WORBLI blockchain account has been created. Account name <b>lipovanski12</b></br>
        Check it out at worbli.bloks.io</br>
        If you had an EOS account on September 7th, you can Claim your Sharedrop</br>
        <button class="green-bg">Claim Your Sharedrop</button>
      </p>
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
} window.customElements.define('wbi-created', WbiCreated);
