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
    this._connect();
  }

  _connect() {
    const key = window.location.hostname.split('.')[0];
    let socketUrl = '';
    if (key === 'dev' || key === '127') {
      socketUrl = 'https://dev-api.worbli.io/';
    } else if (key === 'uat') {
      socketUrl = 'https://uat-api.worbli.io/';
    } else if (key === 'www' || key === 'portal') {
      socketUrl = 'https://api.worbli.io/';
    };
    this.jwt = localStorage.getItem('jwt');
    this.socket = io(socketUrl, {
      query: `jwt=${this.jwt}`,
      transports: ['websocket', 'xhr-polling'],
      autoConnect: true,
    });
    this.socket.on('connect', () => {
      console.log('connected');
      this.socket.on('status', (response) => {
        this.dispatchAction({
          type: 'CHANGE_STATUS',
          status: response.status.status,
        });
        localStorage.setItem('status', response.status.status);
        if (!response.status.worbliAccountName) {
          this.dispatchAction({
            type: 'CHANGE_NETWORK',
            network: 'available',
          });
          localStorage.setItem('network', 'available');
        } else {
          this.dispatchAction({
            type: 'CHANGE_NETWORK',
            network: 'claimed',
          });
          localStorage.setItem('network', 'claimed');
        }
      });
      this.socket.on('imageStatus', (response) => {
        console.log('==== imageStatus START ====');
        console.log(response);
        console.log('==== imageStatus END ====');
        this.dispatchAction({
          type: 'CHANGE_IMAGESTATUS',
          imagestatus: response,
        });
      });
      this.socket.on('disconnect', () => {
        console.log('DISCONNECTED');
      });
    });
  }
} window.customElements.define('wbi-socket', WbiSocket);
