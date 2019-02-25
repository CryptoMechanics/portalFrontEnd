import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiSignin extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        img {
          display: block;
          width: 150px;
          margin: 0 auto;
          padding-bottom: 24px;
        }
        h2 {
          display: block;
          text-align: center;
          color: #2B2C54;
          font-weight: 400;
          font-size: 24px;
        }
        .forgot {
          font-size: 14px;
          display: block;
          text-align: center;
          height: 48px;
          line-height: 48px;
          color: #92CC7F;
          margin-top: 12px;
        }
        .bottom{
          display: flex;
          position: relative;
          bottom: -90px;
        }
        ul {
          flex: 1;
          margin: 0px;
          padding: 0px;
        }
        .bottom a{
          color: #92CC7F;
          text-decoration: none;
          font-size: 14px;
          margin-top: 12px;
        }
        .bottom li {
          list-style: none;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <wbi-center>
        <div class="card">
          <img src="./images/worbli.svg">
          <hr>
          <h2>[[txt.signIn]]</h2>
          <label for="email">[[txt.emailAddress]]</label>
          <input type="text" name="email" id="email" value="{{email::input}}">
          <label for="password">[[txt.password]]</label>
          <input type="password" name="password" id="password" value="{{password::input}}">
          <button type="button" class="green-bg" on-click="_signIn">[[txt.signIn]]</button>
          <button type="button" on-click="_join">[[txt.joinWorbli]]</button>
          <a on-click="_forgot" class="forgot">[[txt.forgotPassword]]</a>
          <div class="bottom">
            <ul><li>English</li></ul>
            <span><a href="http://www.worbli.io">[[txt.backToWorbli]]</a></span>
          </div>
        </div>
      </wbi-center>
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
        observer: '_language',
      },
      mode: {
        type: String,
        readOnly: true,
      },
      color: {
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
  _language(e) {
    this.txt = translations[this.language];
  }
  _signIn() {
    this.$.api.signIn(this.email, this.password);
  }
  _join() {
    this.set('route.path', '/join');
  }
  _forgot() {
    this.set('route.path', '/forgot');
  }
} window.customElements.define('wbi-signin', WbiSignin);
