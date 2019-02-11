import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../../css/shared-styles.js';
import '../../components/wbi-header.js';
import '../../components/wbi-footer.js';
import '../../components/wbi-loading.js';

import '../../components/identity/wbi-application.js';
import '../../components/identity/wbi-reviewing.js';
import '../../components/identity/wbi-status.js';

import store from '../../global/store.js';
const ReduxMixin = createMixin(store);

class WbiIdentity extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }        
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
        <h1>Identity</h1>
        <hr>
        <wbi-application></wbi-application>
        <wbi-reviewing></wbi-reviewing>
        <wbi-status></wbi-status>
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

  _set() {
    this.set('route.path', '/home');
  }
} window.customElements.define('wbi-identity', WbiIdentity);
