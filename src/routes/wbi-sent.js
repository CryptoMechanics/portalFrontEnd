import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/layouts/wbi-center.js';
import '../components/data/wbi-api.js';

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
      <wbi-api id='api'></wbi-api>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.png" alt="Worbli">
          <hr>
          <h2>[[txt.sentEmail]]</h2>
          <template is="dom-if" if="{{email}}">
            <p>[[txt.checkYourEmail]] <strong>[[email]]</strong></p>
            <template is="dom-if" if="{{!forgot}}">
              <button type="button" class="green-bg" on-click="_resend">Resend Verification Email</button>
            </template>
            <template is="dom-if" if="{{error}}">
              <p class="error">[[error]]</p>
            </template>
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
      forgot: {
        type: Boolean,
        value: false,
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

  ready() {
    super.ready();
    if (this.route.path.split('/')[2] === 'forgot') {
      this.forgot = true;
    };
  }
  _resend() {
    this.$.api.resend(this.email)
        .then((response) => {
          if (response && response.data === false && response.error) {
            this.error = response.error;
          } else if (response && response.data === true) {
            this.set('route.path', '/');
          }
        });
  }
  _language(e) {
    this.txt = translations[this.language];
  }
} window.customElements.define('wbi-sent', WbiSent);
