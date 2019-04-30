import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';

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
        a {
          text-decoration: none;
          color: #7FCE75;
        }

      </style>
      <wbi-api id='api'></wbi-api>
      <div>Your WORBLI blockchain account has been created</div>
      <p>Check it out at <a href="http://worbli.bloks.io/account/[[accountName]]" target="_blank">worbli.bloks.io</a></p>
    `;
  }

  static get properties() {
    return {
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
      env: {
        type: Object,
        readOnly: true,
      },
      accountName: {
        type: String,
        observer: '_accountName',
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
  _accountName() {
    if (localStorage.getItem('accountName')) {
      this.accountName = localStorage.getItem('accountName');
    } else {
      this.$.api.getStatus()
          .then((response) => {
            this.accountName = response.worbliAccountName;
            localStorage.setItem('accountName', this.accountName);
          });
    }
  }
} window.customElements.define('wbi-claimed', WbiClaimed);
