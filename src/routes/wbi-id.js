import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/identity/wbi-mobisnap.js';
import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiId extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        div {
          text-align: center;
          margin: 24px;
        }
        h1 {
          margin: 0 auto;
          color: #63656F;
          margin: 44px 0;
        }
        img {
          width: 100%;
          max-width: 360px;
          margin: 21px 0;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <div>
        <template is="dom-if" if="{{allowAccess}}">
          <h1>Allow camera access</h1>
          <p>Enable your camera to continue verification</p>
          <p>Click allow on the popup that will appear on the text screen</p>
          <img src="./images/enable-cam.png">
          <p>Why do I need to do this?</p>
          <button on-click="_takeSelfie">Enable Camera</button>
        </template>
        <template is="dom-if" if="{{selfie}}">
          <wbi-mobisnap file-name="[[country]]_selfie"></wbi-mobisnap>
        </template>
      </div>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
      allowAccess: {
        type: Boolean,
        value: true,
      },
      country: {
        type: String,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      color: state.color,
      env: state.env,
    };
  }

  ready() {
    super.ready();
    this._swapToken();
  }

  _takeSelfie() {
    this.selfie = true;
    this.allowAccess = false;
  }

  _routeChanged() {
    this.token = this.route.__queryParams.token;
  }

  _swapToken() {
    const token = this.route.path.split('/')[2];
    if (token) {
      this.$.api.swapToken(token)
          .then((response) => {
            if (response && response.data === false && response.error) {
              this.country = localStorage.getItem('country');
              this.files = JSON.parse(localStorage.getItem('file'));
              this.jwt = localStorage.getItem('jwt');
            } else if (response && response.data === true) {
              localStorage.setItem('country', response.country);
              localStorage.setItem('files', response.files);
              localStorage.setItem('jwt', response.jwt);
              this.country = response.country;
              this.files = JSON.parse(response.files);
              this.jwt = response.jwt;
            }
          });
    }
  }
} window.customElements.define('wbi-id', WbiId);
