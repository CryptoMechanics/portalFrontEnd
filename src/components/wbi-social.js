import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../global/store.js';
import '../css/shared-styles.js';

import '../components/social/icon-facebook.js';
import '../components/social/icon-instagram.js';
import '../components/social/icon-linkedin.js';
import '../components/social/icon-medium.js';
import '../components/social/icon-pinterest.js';
import '../components/social/icon-steemit.js';
import '../components/social/icon-telegram.js';
import '../components/social/icon-tumblr.js';
import '../components/social/icon-twitch.js';
import '../components/social/icon-twitter.js';
import '../components/social/icon-youtube.js';

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
        ul li {
          display:inline;
          margin-right: 5px;
        }
        ul {
          display: flex;
          padding: 0;
        }
      </style>
 
        <div>
          <ul>
            <template is="dom-if" if="[[env.social.facebook]]">
              <li><a href="[[env.social.facebook]]" target="_blank" id="Facebook"><icon-facebook></icon-facebook></a></li>
            </template>
            <template is="dom-if" if="[[env.social.instagram]]">
              <li><a href="[[env.social.instagram]]" target="_blank" id="Instagram"><icon-instagram></icon-instagram></a></li>
            </template>
            <template is="dom-if" if="[[env.social.linkedin]]">
              <li><a href="[[env.social.linkedin]]" target="_blank" id="Linkedin"><icon-linkedin></icon-linkedin></a></li>
            </template>
            <template is="dom-if" if="[[env.social.medium]]">
              <li><a href="[[env.social.medium]]" target="_blank" id="Medium"><icon-medium></icon-medium></a></li>
            </template>
            <template is="dom-if" if="[[env.social.pinterest]]">
              <li><a href="[[env.social.pinterest]]" target="_blank" id="Pinterest"><icon-pinterest></icon-pinterest></a></li>
            </template>
            <template is="dom-if" if="[[env.social.steemit]]">
              <li><a href="[[env.social.steemit]]" target="_blank" id="Steemit"><icon-steemit></icon-steemit></a></li>
            </template>
            <template is="dom-if" if="[[env.social.telegram]]">
              <li><a href="[[env.social.telegram]]" target="_blank" id="Telegram"><icon-telegram></icon-telegram></a></li>
            </template>
            <template is="dom-if" if="[[env.social.tumblr]]">
              <li><a href="[[env.social.tumblr]]" target="_blank" id="Tumblr"><icon-tumblr></icon-tumblr></a></li>
            </template>
            <template is="dom-if" if="[[env.social.twitch]]">
              <li><a href="[[env.social.twitch]]" target="_blank" id="Twitch"><icon-twitch></icon-twitch></a></li>
            </template>
            <template is="dom-if" if="[[env.social.twitter]]">
              <li><a href="[[env.social.twitter]]" target="_blank" id="Twitter"><icon-twitter></icon-twitter></a></li>
            </template>
            <template is="dom-if" if="[[env.social.youtube]]">
              <li><a href="[[env.social.youtube]]" target="_blank" id="YouTube"><icon-youtube></icon-youtube></a></li>
            </template>
          </ul>
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
