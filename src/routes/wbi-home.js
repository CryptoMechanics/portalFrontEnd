import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/wbi-header.js';
import '../components/wbi-footer.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiHome extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        } 
        .block{
          border: 1px solid #BDC1C6;
          display: flex;
          margin-bottom: 12px;
          padding: 12px;
          border-radius: 4px;
          background-color: #F8F8F8;
          text-decoration: none;
        }
        .block div {
          display: inline-block;
        } 
        .title{
          flex:1;
          color: #636670;
          font-size: 20px;
          line-height: 66px;
        } 
        .disk{
          width: 90px;
        } 
        .next{
          padding-top:12px;
        }
        @media only screen and (max-width: 600px) {
          .card {
            padding: 24px;
            border-radius: 0px;
          }
          wbi-header {
            position: relative;
            top: -1px;
          }
          .disk img{
            width: 45px;
          }
          .title {
            line-height: 45px
          }
          .next img{
            width: 25px;
          }
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>

      <wbi-header></wbi-header>
      <div class="card">
      
        <a href="/profile/" class="block">
          <div class="disk"><img src="./images/profile-header-icon.svg"></div>
          <div class="title">[[txt.myProfile]]</div>
          <div class="next"><img src="/images/next.svg"></div>
        </a>
        <a href="/identity/" class="block">
          <div class="disk"><img src="/images/identity-header-icon.svg"></div>
          <div class="title">[[txt.identity]]</div>
          <div class="next"><img src="/images/next.svg"></div>
        </a>
        <a href="/network/" class="block">
          <div class="disk"><img src="/images/network-header-icon.svg"></div>
          <div class="title">[[txt.networkAccount]]</div>
          <div class="next"><img src="/images/next.svg"></div>
        </a>

      </div>
      <wbi-footer></wbi-footer>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
      language: {
        type: String,
        readOnly: true,
      },
      mode: {
        type: String,
        readOnly: true,
      },
      color: {
        type: Object,
        readOnly: true,
      },
      language: {
        type: String,
        readOnly: true,
        observer: '_language',
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

  _set() {
    this.set('route.path', '/home');
  }
  _language(e) {
    this.txt = translations[this.language];
  }
} window.customElements.define('wbi-home', WbiHome);
