import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';

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
        .green-bg{
          background-color: var(--active-color, #BDC1C6);
          cursor: var(--cursor-type, default);
          pointer-events: var(--pointer-event, none);
        }

      </style>
      <wbi-api id='api'></wbi-api>
      <h2>Name</h2>
        <label>Worbli Account Name</label>
        <input type="text" name="accountName" id="accountName" value="{{accountName::input}}" on-keyup="_accountName" on-paste="_accountName">
        <small>
          Choose your desired Worbli account name. </br>
          (6-12 charectors, must start with a letter and can only contain letters and numbers 1-5)
        </small>
      <hr>
      <h2>Keys</h2>
        <label>Owner Public Key</label>
        <input type="text" name="ownerPublicKey" id="ownerPublicKey" value="{{ownerPublicKey::input}}" on-keyup="_ownerPublicKey" on-paste="_ownerPublicKey"></br>

        <label>Active Public Key</label>
        <input type="text" name="activePublicKey" id="activePublicKey" value="{{activePublicKey::input}}" on-keyup="_activePublicKey" on-paste="_activePublicKey"></br>
        <a href="">Not sure what public keys are?</br>Check out our FAQ on how to generate a public key with Scatter.</a>
        <button class="green-bg" on-click="_submit">Apply for account</button>
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
      network: {
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
      focus: {
        type: Boolean,
        value: true,
        observer: '_focusAccountName',
      },
      checkedAccountName: {
        type: Boolean,
        value: false,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
      netowrk: state.network,
    };
  }
  _accountName(e) {
    this._checkAccountName();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#ownerPublicKey').focus();
    }
  }
  _ownerPublicKey(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#activePublicKey').focus();
    }
  }
  _activePublicKey(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this._submit();
    }
  }
  _isComplete() {
    if (this.checkedAccountName && this._validatePublicKey(this.ownerPublicKey) && this._validatePublicKey(this.activePublicKey)) {
      this.updateStyles({'--active-color': '#92CC7F'});
      this.updateStyles({'--cursor-type': 'pointer'});
      this.updateStyles({'--pointer-event': 'auto'});
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      this.updateStyles({'--cursor-type': 'default'});
      this.updateStyles({'--pointer-event': 'none'});
    }
  }
  _submit() {
    if (this.checkedAccountName && this._validatePublicKey(this.ownerPublicKey) && this._validatePublicKey(this.activePublicKey)) {
      this.$.api.createAccount(this.accountName, this.ownerPublicKey, this.activePublicKey)
          .then((response) => {
            if (response.data === false) {
              this.error = response.error;
            } else if (response.data === true) {
              console.log('setting network to claimed');
              this.dispatchAction({
                type: 'CHANGE_NETWORK',
                network: 'claimed',
              });
              localStorage.setItem('network', 'claimed');
            }
          });
    }
  }
  _focusAccountName() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#accountName').focus();
    }, 0);
  }
  _checkAccountName() {
    if (this._validateAccountName(this.accountName)) {
      this.$.api.checkAccountName(this.accountName)
          .then((response) => {
            if (response.data === false) {
              this.checkedAccountName = true;
            } else {
              this.checkedAccountName = false;
            }
          });
    }
  }
  _validateAccountName(name) {
    if (!name) return false;
    const re = /^(?!.*?worbli)[a-z1-5]{6,12}$/;
    return re.test(name);
  }
  _validatePublicKey(key) {
    const re = /^EOS[A-Za-z0-9]{50}$/;
    return re.test(key);
  }
} window.customElements.define('wbi-access', WbiAccess);
