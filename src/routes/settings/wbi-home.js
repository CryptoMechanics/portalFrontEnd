import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../../css/shared-styles.js';
import '../../components/wbi-header.js';
import '../../components/wbi-footer.js';

import store from '../../global/store.js';
const ReduxMixin = createMixin(store);

class WbiHome extends ReduxMixin(PolymerElement) {
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
      
        <a href="/settings/profile/">
          <div><img src=""></div>
          <div>My profile</div>
          <div><img src=""></div>
        </a>
        <a href="/settings/identity/">
          <div><img src=""></div>
          <div>Identity</div>
          <div><img src=""></div>
        </a>
        <a href="/settings/network/">
          <div><img src=""></div>
          <div>Network account</div>
          <div><img src=""></div>
        </a>

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
} window.customElements.define('wbi-home', WbiHome);
