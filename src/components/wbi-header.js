import {createMixin} from '../../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import store from '../global/store.js';
import '../css/shared-styles.js';
import '../components/data/wbi-socket.js';

const ReduxMixin = createMixin(store);
class WbiHeader extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          box-shadow: inset 0 1px 0 black, 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
          background-color: white;
          margin-bottom: 24px;
          width: 100%;
          height: 55px;
        }
        ul li {
          display: inline-block
        }
        ul li a {
          font-size: 14px;
          color: #383c3e;
          line-height: 55px;
          line-height: 30px;
          margin-right: 24px;
          font-weight: 500;
          text-transform: capitalize;
        }
        div {
          flex: 1;
        }
        .header {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logout{
          flex: none;
        }
        a {
          text-decoration: none;
        }
        .logo {
          margin-top: 16px;
          margin-left: 12px;
          height: 25px;
          margin-right: 36px;
          cursor: pointer;
        }
        .main-nav img, .logout img {
          width: 17px;
          margin-right: 8px;
        }
        .mobile-menu{
          display: none;
        }
        .mobile-menu img{
          display: none;
        }
        .language{
          display: none;
        }
        .language img {
          height: 17px;
          width: 17px;
        }
        @media only screen and (max-width: 768px) {
          .main-nav {
            display: none;
          }
          .mobile-menu{
            display: block;
            max-width: 65px;
          }
          .mobile-menu img{
            display: inline;
            margin: 17px;
            opacity: 0.5;
            transform: scale(0.8);
            cursor: pointer;
          }
          .logout {
            display: none;
            text-transform: capitalize;
          }
          .logo {
            margin: 0 auto;
            margin-top: 17px;
          }
          :host {
            position: relative;
            top: -1px;
          }
          .language{
            display: inline;
            max-width: 80px;
            padding-top: 15px;
          }
          .language img {
            position: relative;
            top: 3px;
            left: -3px;
          }
        }

      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-socket></wbi-socket>
      <div class="header">
        <div class="mobile-menu" on-click='_mobimenu'>
          <img src="./images/menu-icon.png" >
        </div>
        <img src="./images/worbli.png" class="logo" on-click="_settings">
        <div class="main-nav">
          <ul>
            <li><a href="/profile/"><img src="./images/profile-icon.svg" style="position: relative; top: 4px;">[[txt.myProfile]]</a></li>
            <li><a href="/identity/"><img src="./images/identity-icon.svg" style="position: relative; top: 2px;">[[txt.identity]]</a></li>
            <li><a href="/network/"><img src="./images/network-icon.svg" style="position: relative; top: 5px;">[[txt.networkAccount]]</a></li>
          </ul>
        </div>
        <div class="logout">
          <ul>
            <li><a on-click="_logout"><img src="./images/logout-icon.svg" style="position: relative; top: 3px;">[[txt.logout]]</a></li>
            <li><a on-click="_language"><img src="./images/language-icon.svg" style="position: relative; top: 4px;">[[txt.language]]</a></li>
          </ul>
        </div>
        <div class="language">
          <img src="./images/language-icon.svg">
            English
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      language: {
        type: String,
        readOnly: true,
        observer: '_language',
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
  _mobimenu() {
    this.dispatchEvent(new CustomEvent('mobimenu', {bubbles: true, composed: true}));
  }
  _settings() {
    this.set('route.path', '/');
  }
  _logout() {
    localStorage.clear();
    this.set('route.path', '/signin/');
  }
  _language(e) {
    this.txt = translations[this.language];
  }
} window.customElements.define('wbi-header', WbiHeader);
