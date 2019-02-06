import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../global/store.js';
import '../css/shared-styles.js';

const ReduxMixin = createMixin(store);
class WbiSocial extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
      </style>
      <div>
        <div>
          <ul>
            <li><a href="[[env.social.facebook]]" id="Facebook">Facebook</a></li>
            <li><a href="[[env.social.Instagram]]" id="Instagram">Instagram</a></li>
            <li><a href="[[env.social.Twitter]]" id="Twitter">Twitter</a></li>
            <li><a href="[[env.social.Linkedin]]" id="Linkedin">Linkedin</a></li>
            <li><a href="[[env.social.Telegram]]" id="Telegram">Telegram</a></li>
            <li><a href="[[env.social.Medium]]" id="Medium">Medium</a></li>
            <li><a href="[[env.social.Steemit]]" id="Steemit">Steemit</a></li>
            <li><a href="[[env.social.YouTube]]" id="YouTube">YouTube</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      language: {
        type: Text,
        readOnly: true,
      },
      mode: {
        type: Text,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
      },
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
} window.customElements.define('wbi-social', WbiSocial);
