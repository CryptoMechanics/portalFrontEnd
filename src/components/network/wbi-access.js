import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../../translations/languages.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';
import '../../components/loading/ball-spin.js';

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
          color: #356327;
        }
        .green-bg{
          background-color: var(--active-color, #50595E);
        }
        .error {
          padding: 12px 12px;
        } 
        .small {
          padding-top: 12px;
          display: block;
          padding-bottom: 12px;
        } 
        ball-spin{
          display: inline-block;
          margin-right: 6px;
          position: relative;
          top: 2px;
        }
      </style>
      <wbi-api id='api'></wbi-api>
      <template is="dom-if" if="[[multipleAccounts]]">
        <i>You have already created the following accounts.</i>
        <dom-repeat id="accountList" items="{{moreAccounts}}">
          <template>
            <div>- {{item}}:  <a href="https://worbli.bloks.io/account/{{item}}">https://worbli.bloks.io/account/{{item}}</a></div>
          </template>
        </dom-repeat>
        <hr>
      </template>
      <h2>[[txt.name]]</h2>
        <label>[[txt.worbliNetworkAccount]]</label>
        <input type="text" name="accountName" id="accountName" value="{{accountName::input}}" on-keyup="_accountName" on-paste="_accountName">
        <small class="small">[[txt.chooseWorbliAccountName]]</br>[[txt.acountCriterea]]</br>Note: <i>Account names cannot contain the word "worbli"</i>
        </small>
      <hr>
      <h2>[[txt.keys]]</h2>
        <label>[[txt.ownerPublicKey]]</label>
        <input type="text" name="ownerPublicKey" id="ownerPublicKey" value="{{ownerPublicKey::input}}" on-keyup="_ownerPublicKey" on-paste="_ownerPublicKey"></br>

        <label>[[txt.activePublicKey]]</label>
        <input type="text" name="activePublicKey" id="activePublicKey" value="{{activePublicKey::input}}" on-keyup="_activePublicKey" on-paste="_activePublicKey"></br>
        <a href="">[[txt.whatPublicKeysAre]]</br>[[txt.faqPublicKeys]]</a>
        
        <template is="dom-if" if="{{!loading}}">
          <button class="green-bg" on-click="_submit">[[txt.applyForAccount]]</button>
        </template>
        <template is="dom-if" if="{{loading}}">
          <button type="button" class="green-bg"><ball-spin></ball-spin>[[txt.loading]]</button><br>
        </template>
        <template is="dom-if" if="{{error}}">
          <p class="error">[[error]]</p>
        </template>
    `;
  }

  static get properties() {
    return {
      language: {
        type: String,
        readOnly: true,
        observer: '_language',
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
      loading: {
        type: Boolean,
        value: false,
      },
      multipleAccounts: {
        type: Boolean,
        value: false,
        observer: '_checkMultipleAccounts',
      }
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
      this.updateStyles({'--active-color': '#356327'});
      return true;
    } else {
      this.updateStyles({'--active-color': '#50595E'});
      return false;
    }
  }
  _checkMultipleAccounts() {
    const multipleAccounts = false;
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
      this.moreAccounts = accountName.filter(function(el) {
        return el != null;
      });
    }
    
  }
  _submit() {
    this.error = '';
    if (this._isComplete()) {
      this.loading = true;
      this.$.api.createAccount(this.accountName, this.ownerPublicKey, this.activePublicKey)
          .then((response) => {
            this.loading = false;
            if (response.data === false) {
              this.error = response.error.replace(/['"]+/g, '');
            } else if (response.data === true) {
              this.dispatchAction({
                type: 'CHANGE_NETWORK',
                network: 'claimed',
              });
              localStorage.setItem('accountName', this.accountName);
              localStorage.setItem('network', 'claimed');
            }
          });
    } else {
      if (!this._validateAccountName(this.accountName)) {
        this.error = 'Invalid account name. Make sure your account name is 6-12 characters and only contains letters and digits 1-5.';
      } else if (!this.checkedAccountName) {
        this.error = 'Account name is unavailable.';
      } else if (!this._validatePublicKey(this.ownerPublicKey)) {
        this.error = 'Invalid owner public key.';
      } else if (!this._validatePublicKey(this.activePublicKey)) {
        this.error = 'Invalid active public key.';
      }
    }
  }
  _focusAccountName() {
    setTimeout(() => {
      this.shadowRoot.querySelector('#accountName').focus();
    }, 0);
  }
  _checkAccountName() {
    if (this._validateAccountName(this.accountName)) {
      this.error = '';
      this.$.api.checkAccountName(this.accountName)
          .then((response) => {
            if (response.error) {
              this.error = response.error.replace(/['"]+/g, '');
            } else {
              this.error = '';
            }
            if (response.data === false) {
              this.checkedAccountName = true;
              this._isComplete();
            } else {
              this.checkedAccountName = false;
              this._isComplete();
            }
          });
    } else {
      this.checkedAccountName = false;
      this._isComplete();
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
  _language(e) {
    this.txt = translations[this.language];
  }
} window.customElements.define('wbi-access', WbiAccess);
