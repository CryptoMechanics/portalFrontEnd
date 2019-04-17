import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '@polymer/app-route/app-location.js';

const ReduxMixin = createMixin(store);
class WbiSocket extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
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
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }
  ready() {
    super.ready();
    console.log('ready');
    this._connect();
  }
  _connect() {
    console.log('_connect called');
    this.jwt = localStorage.getItem('jwt');
    console.log('this.jwt');
    console.log(this.jwt);
    this.socket = io('https://dev-api.worbli.io/ws/v1/', {query: `jwt=${this.jwt}`});
    console.log(this.socket);
    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.on('status', (data) => {
        console.log(data);
      });
    });
  }
} window.customElements.define('wbi-socket', WbiSocket);
