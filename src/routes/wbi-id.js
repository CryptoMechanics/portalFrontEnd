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
        label {
          width: 100%;
          display: block;
          min-height: 50px;
          border-radius: 3px;
          background-color: #5284CE;
          text-transform: uppercase;
          color: white;
          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
          cursor: pointer;
        }
        input {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <div>
        <h1>Upload documents</h1>
        <p>Select the document you want to take a photo of below</p>

<form id="form">
        <label for="selfie">Selfie
          <input type="file" accept="image/*" id="selfie" on-change="_upload" capture>
        </label>
        <template is='dom-repeat' items='[[files]]'>
          <label for="[[item.value]]">[[item.label]]
            <input type="file" accept="image/*" id="[[item.value]]" on-change="_upload" capture>
          </label>
        </template>
</form>

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
      files: {
        type: Array,
      },
      jwt: {
        type: String,
      },
      selfie: {
        type: Boolean,
        value: false,
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

  _upload() {
    console.log('upload');
  }

  _swapToken() {
    const token = this.route.path.split('/')[2];
    const jwt = localStorage.getItem('jwt');
    if (token && !jwt) {
      this.$.api.swapToken(token)
          .then((response) => {
            console.log(response);
            if (response && response.data === false && response.error) {
              this.country = localStorage.getItem('country');
              this.files = JSON.parse(localStorage.getItem('files'));
              this.jwt = localStorage.getItem('jwt');
            } else if (response && response.data === true) {
              localStorage.setItem('country', response.country);
              localStorage.setItem('files', response.files);
              localStorage.setItem('jwt', response.jwt);
              this.country = response.country;
              this.files = JSON.parse(response.files);
              this.jwt = response.jwt;
            }
            if (!this.files) {
              this.allowAccess = false;
              console.log('your done');
            }
          });
    }
  }
} window.customElements.define('wbi-id', WbiId);
