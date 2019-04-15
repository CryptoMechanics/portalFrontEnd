import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiId extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
        <p>missing images are:</p>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
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

  _routeChanged() {
    this.token = this.route.__queryParams.token;
  }

  _swapToken() {
    const token = this.route.path.split('/')[2];
    if (token) {
      this.$.api.swapToken(token)
          .then((response) => {
            if (response && response.data === false && response.error) {
              this.error = response.error;
            } else if (response && response.data === true) {
              console.log(response);
            }
          });
    }
  }
} window.customElements.define('wbi-id', WbiId);
