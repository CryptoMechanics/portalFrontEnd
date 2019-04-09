import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class Wbiverify extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        img {
          display: block;
          width: 150px;
          margin: 0 auto;
          padding-bottom: 24px;
        }
        h2 {
          display: block;
          text-align: center;
          color: #2B2C54;
          font-weight: 400;
          font-size: 24px;
        }
      </style>
      <wbi-api id='api'></wbi-api>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <template is="dom-if" if="{{error}}">
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.svg" alt="Worbli">
          <hr>
          
          <h2>Invalid Link</h2>
          <p>You have followed an invalid link or your account has already been verified.</p>
          <button type="button" class="green-bg" on-click="_signIn">Sign In</button>
        </div>
      </wbi-center>
      </template>
    `;
  }

  static get properties() {
    return {
      route: {
        type: Object,
        observer: '_route',
      },
      error: {
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
      email: state.email,
    };
  }
  _signIn() {
    this.set('route.path', '/signin/');
  }
  _route() {
    this.$.api.verify(this.route.__queryParams.token)
        .then((response) => {
          if (response && response.data === false && response.err) {
            this.error = response.err;
          } else if (response && response.data === true) {
            localStorage.setItem('jwt', response.jwt);
            this.set('route.path', '/');
          }
        });
  }
} window.customElements.define('wbi-verify', Wbiverify);
