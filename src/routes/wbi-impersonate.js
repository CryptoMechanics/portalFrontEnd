import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiImpersonate extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 10px 20px;
        }
      </style>
        <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
        Impersonate
    `;
  }

  static get properties() {
    return {
      route: {
        type: Object,
        observer: '_route',
      },
      env: {
        type: Object,
        readOnly: true,
      },
      language: {
        type: String,
        readOnly: true,
        observer: '_language',
      },
      mode: {
        type: String,
        readOnly: true,
      },
      color: {
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

  _route() {
    const data = true;
    const jwt = this.route.__queryParams.jwt;
    const email = decodeURI(this.route.__queryParams.email);
    const status = this.route.__queryParams.status;
    const worbliAccountName = this.route.__queryParams.worbliAccountName;
    localStorage.setItem('email', email);

    console.log(email);

    if (!worbliAccountName) {
      this.dispatchAction({
        type: 'CHANGE_NETWORK',
        network: 'available',
      });
      localStorage.setItem('email', email);
      localStorage.setItem('network', 'available');
    } else {
      this.dispatchAction({
        type: 'CHANGE_NETWORK',
        network: 'claimed',
      });
      localStorage.setItem('network', 'claimed');
    }
    this.dispatchAction({
      type: 'CHANGE_STATUS',
      status: status,
    });
    localStorage.setItem('status', status);
    if (data === false && error) {
      this.error = error.replace(/['"]+/g, '');
      if (resend) {
        this.resend = true;
      }
    } else if (data === true) {
      localStorage.setItem('jwt', jwt);
      const loc = window.location.href.split('?')[0];
      window.location.href = loc.split('impersonate')[0];
    }
  }
} window.customElements.define('wbi-impersonate', WbiImpersonate);
