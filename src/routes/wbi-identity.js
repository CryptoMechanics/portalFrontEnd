import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/wbi-header.js';
import '../components/wbi-footer.js';
import '../components/wbi-loading.js';

import '../components/identity/wbi-created.js';
import '../components/identity/wbi-pending.js';
import '../components/identity/wbi-manualreview.js';
import '../components/identity/wbi-approved.js';
import '../components/identity/wbi-rejected.js';
import '../components/identity/wbi-error.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiIdentity extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .card {
          max-width: 700px;
        } 
        h1 {
          line-height: 28px;
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
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
        <div class="header">
          <img src="./images/identity-header-icon.svg"><h1>Identity</h1>
        </div>
        <hr>

        <template is="dom-if" if="{{created}}">   
          <wbi-created></wbi-created>
        </template>
        <template is="dom-if" if="{{pending}}">   
          <wbi-pending></wbi-pending>
        </template>
        <template is="dom-if" if="{{manualreview}}">   
          <wbi-manualreview></wbi-manualreview>
        </template>
        <template is="dom-if" if="{{approved}}">   
          <wbi-approved></wbi-approved>
        </template>
        <template is="dom-if" if="{{rejected}}">   
          <wbi-rejected></wbi-rejected>
        </template>
        <template is="dom-if" if="{{error}}">   
          <wbi-error></wbi-error>
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
      status: {
        type: String,
        readOnly: true,
        observer: '_status',
      },
      created: {
        type: Boolean,
        readOnly: false,
      },
      pending: {
        type: Boolean,
        readOnly: false,
      },
      manualreview: {
        type: Boolean,
        readOnly: false,
      },
      approved: {
        type: Boolean,
        readOnly: false,
      },
      rejected: {
        type: Boolean,
        readOnly: false,
      },
      error: {
        type: Boolean,
        readOnly: false,
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
    };
  }

  _status() {
    this.created = false;
    this.pending = false;
    this.manualreview = false;
    this.approved = false;
    this.rejected = false;
    this.error = false;
    switch (this.status) {
      case 'created':
        this.created = true;
        break;
      case 'pending':
        this.pending = true;
        break;
      case 'manualreview':
        this.manualreview = true;
        break;
      case 'approved':
        this.approved = true;
        break;
      case 'rejected':
        this.rejected = true;
        break;
      case 'error':
        this.error = true;
    }
  }

  _set() {
    this.set('route.path', '/home');
  }
} window.customElements.define('wbi-identity', WbiIdentity);
