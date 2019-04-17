import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '@polymer/app-route/app-location.js';

const ReduxMixin = createMixin(store);
class WbiSocket extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <script src="[[env.socketUrl]]/socket.io.js"></script>
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
  _connect() {
    this.jwt = localStorage.getItem('jwt');
    this.socket = io(this.env.socketUrl, {query: `jwt=${this.jwt}`});
    this.socket.on('connect', () => {
      this.socket.on('status', (data) => {
        console.log(data);
      });
    });
  }
} window.customElements.define('wbi-socket', WbiSocket);
