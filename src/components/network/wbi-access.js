import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiAccess extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
        a {
          color: #92CC7F;
        }

      </style>
      <h2>Name</h2>
        <label>Worbli Account Name</label>
        <input type="text" name="email" id="email" value="{{email::input}}">
      <hr>
      <h2>Keys</h2>
        <label>Owner Public Key</label>
        <input type="text" name="email" id="email" value="{{email::input}}"></br>
        <small>
          Choose your desired Worbli account name. </br>
          (6-12 charectors, must start with a letter and can only contain letters and numbers 1-5)
        </small>
        <label>Active Public Key</label>
        <input type="text" name="email" id="email" value="{{email::input}}"></br>
        <a href="">Not sure what public keys are?</br>Check out our FAQ on how to generate a public key with Scatter.</a>
        <button class="green-bg">Apply for account</button>
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
} window.customElements.define('wbi-access', WbiAccess);
