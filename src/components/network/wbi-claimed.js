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
      <div>Your WORBLI blockchain account has been created</div><br/>
      <div>Account name: [[accountName]]</div>
      <p>Check it out at <a href="http://worbli.bloks.io/account/[[accountName]]" target="_blank">http://worbli.bloks.io/account/[[accountName]]</a></p>
      <template is="dom-if" if="[[multipleAccounts]]">
        <i>Note: You have created additional accounts.</i>
        <dom-repeat id="accountList" items="{{moreAccounts}}">
          <template>
            <div>- {{item}}:  <a href="https://worbli.bloks.io/account/{{item}}">https://worbli.bloks.io/account/{{item}}</a></div>
          </template>
        </dom-repeat>
      </template>
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
  ready() {
    super.ready();
    const accountName = JSON.parse(localStorage.getItem('accountName'));
    if (accountName) {
      this.accountName = JSON.parse(localStorage.getItem('accountName'))[0];
    } else {
      this.$.api.getStatus()
          .then((response) => {
            console.log(response);
            this.accountName = response.worbliAccountNames[0];
            localStorage.setItem('accountName', this.accountName);
          });
    }
    if (accountName.length > 1) {
      this.multipleAccounts = true;
      accountName.splice(0, 1);
      this.moreAccounts = accountName;
    }
  }
} window.customElements.define('wbi-claimed', WbiClaimed);
