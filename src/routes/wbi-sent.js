import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSent extends ReduxMixin(PolymerElement) {
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
        p {
          margin-bottom: 32px;
        }
        @media only screen and (max-width: 600px) {
          .card {
            border-radius: 0px;
          }
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.svg">
          <hr>
          <h2>[[txt.sentEmail]]</h2>
          <template is="dom-if" if="{{email}}">
            <p>[[txt.checkYourEmail]] [[email]]</p>
          </template>
        </div>
      </wbi-center>
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
      email: {
        type: String,
        readOnly: true,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      email: state.email,
      color: state.color,
      env: state.env,
    };
  }
  _language(e) {
    this.txt = translations[this.language];
  }
} window.customElements.define('wbi-sent', WbiSent);
