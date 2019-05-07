import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../global/store.js';
import '../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiMobinav extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          --opacity: 0;
          --display-none-block: none;
          position: fixed; 
          display: var(--display-none-block);
          width: 100%; 
          height: 100%; 
          top: 54px; 
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999; 
        }
        .overlay{
          opacity: var(--opacity);
          background-color: rgba(0, 0, 0, 0.5); 
          transition: opacity 0.2s ease-in-out;
          position: fixed; 
          display: block;
          width: 100%; 
          height: 100%; 
          top: 55px; 
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 300; 
          cursor: pointer; 
          display: flex;
          align-items: left;
        }
        .sideMenu{
            width: 230px;
            background-color: #EBEBEC;
        }
        ul li {
            font-size: 16px;
            color: #646771;
            line-height: 50px;
        }
      </style>
      <div class="overlay">
        <div class="sideMenu">
            <ul>
                <li>My profile</li>
                <li>Identity</li>
                <li>Network Account</li>
                <li>Logout</li>
            </ul>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      language: {
        type: String,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
      },
      join: {
        type: Boolean,
        value: false,
      },
      login: {
        type: Boolean,
        value: false,
      },
      feedback: {
        type: Boolean,
        value: false,
      },
      turnoff: {
        type: Boolean,
        value: false,
      },
      closenow: {
        type: Boolean,
        value: false,
        observer: '_closenow',
      },
      mobinavopen: {
        type: Boolean,
        value: false,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
    };
  }

  ready() {
    super.ready();
    window.addEventListener('mobimenu', (e) => {
      if (!this.mobinavopen) {
        this._show();
        this.mobinavopen = true;
      } else {
        this._hide();
        this.mobinavopen = false;
      }
    });
  }

  _show() {
    this.updateStyles({'--display-none-block': 'block'});
    setTimeout(()=>{
      this.updateStyles({'--opacity': 1});
    }, 1);
  }

  _closenow() {
    if (this.closenow) {
      this._hide();
    }
  }

  _hide() {
    setTimeout(() => {
      this.updateStyles({'--opacity': 0});
      this.updateStyles({'--display-none-block': 'none'});
    }, 1);
  }

  _clickModal(event) {
    event.stopPropagation();
  }
} window.customElements.define('wbi-mobinav', WbiMobinav);
