import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';

import '../components/wbi-header.js';
import '../components/wbi-footer.js';
import '../components/wbi-loading.js';

import '../components/network/wbi-noaccess.js';
import '../components/network/wbi-access.js';
import '../components/network/wbi-claimed.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiNetwork extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }   
        .header {
          display: flex;
        }  
        .header img{
          margin-right: 12px;
        } 
        hr {
          margin: 24px 0;
        }
        .card {
          max-width: 700px;
        }        
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
      <div class="header">
          <img src="./images/network-header-icon.svg"><h1>Network Account</h1>
        </div>
        <hr>
        <template is="dom-if" if="{{noaccess}}"> 
          <wbi-noaccess></wbi-noaccess>
        </template>
        <template is="dom-if" if="{{access}}"> 
          <wbi-access></wbi-access>
        </template>
        <template is="dom-if" if="{{claimed}}"> 
          <wbi-claimed></wbi-claimed>
        </template>
      </div>
      <wbi-footer></wbi-footer>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
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
      noaccess: {
        type: Boolean,
        value: false,
      },
      access: {
        type: Boolean,
        value: false,
      },
      claimed: {
        type: Boolean,
        value: false,
      },
      status: {
        type: String,
        readOnly: true,
        observer: '_status',
      },
      network: {
        type: String,
        readOnly: true,
        observer: '_status',
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
      status: state.status,
      network: state.network,
    };
  }

  _status() {
    if (this.status === 'approved' && this.network === 'available') {
      this.access = true;
      this.noaccess = false;
      this.claimed = false;
    }
    if (this.status != 'approved' && this.network === 'available') {
      this.access = false;
      this.noaccess = true;
      this.claimed = false;
    }
    if (this.network === 'claimed') {
      this.access = false;
      this.noaccess = false;
      this.claimed = true;
    }
  }
  _set() {
    this.set('route.path', '/home');
  }
} window.customElements.define('wbi-network', WbiNetwork);
