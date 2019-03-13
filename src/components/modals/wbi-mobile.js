import {createMixin} from 'polymer-redux';
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiMobile extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          background-color: white;
        }
      </style>
      <div> Mobile.
      </div>
    `;
  }

  static get properties() {
    return {
      language: {
        type: Text,
        readOnly: true,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
    };
  }

  ready() {
    super.ready();
  }
} window.customElements.define('wbi-mobile', WbiMobile);
