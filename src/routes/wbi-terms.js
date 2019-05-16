import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/layouts/wbi-center.js';
import '../components/wbi-footer.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiTerms extends ReduxMixin(PolymerElement) {
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
        p {
          margin-bottom: 32px;
        }
        .error{
          padding: 12px 0;
        }
        .green-bg{
          background-color: var(--active-color, #50595E);
        }
        .card{
          max-width: none;
          margin: 24px;
          font-size: 16px;
          line-height: 24px;
        }
        li strong {
          margin: 24px 0;
          color: #001D6F;
          font-weight: 700;
          font-size: 17px;
        }
        h1 {
          font-weight: 300;
        }
        a {
          color: #001D6F;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        @media only screen and (max-width: 600px) {
          .card {
            border-radius: 0px;
          }
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <wbi-center>
        <div class="card">
          <h1>User Terms</h1>
          <p>As a user of the WORBLI ecosystem, you will be subject to certain terms of use based on your status and activities. These are:</p>
          <ul>
              <li><strong>Platform User</strong> – all users will sign up to the WORBLI Platform. This is essentially the first step in your WORBLI journey. This is where you find out about the WORBLI Network, WORBLI Developer Support and WORBLI Tokens, etc. Here you can read and post content, interact with other WORBLI users and ask questions of WORBLI directly. In order to be a Platform User, you are only required to provide us with your name and contact details. Your use of the WORBLI Platform is governed by the <a href="/platformterms">Platform Terms</a>, which <em>only</em> set out standard rights and obligations around your use of the WORBLI Platform. At this stage, apart from your name and email, we are not seeking to collect any further identification information nor will we use it for any purpose other than the limited purpose stated in our <a href="/platformterms">Platform Terms</a> and <a href="/privacy">Privacy Policy</a> (both set out below).</li>
              <br/>
              <li><strong>Network User</strong> – the WORBLI Network is the platform upon which users interact with and develop their own dApps. It is the heart of the WORBLI ecosystem. Users gain access to the WORBLI Network upon completion of WORBLI's 'know your customer' verification process. This verification process is integral to WORBLI's goal of being the world's first compliant blockchain network. However, rest assured, we will not be using the information we collect for any reason other than to complete verification, operate the WORBLI Network and meet our own requirements under applicable law. Please read through our <a href="/privacy">Privacy Policy</a> set out below for more details. Once you are verified as a Network User you will be able to fully access the WORBLI Network including the dApps available on it. Your use of the WORBLI Network will then be subject to the <a href="/networkterms">Network Terms</a> set out below.</li>
              <br/>
              <li><strong>dApp Developer</strong> – we view the WORBLI Network as the world's leading platform to develop distributed applications (dApps) that require a robust compliance framework. It is very important to us that we attract and support the world's best dApps developers. We have therefore built a clear rules-based framework to support and nurture developers and ensure they are aligned with our compliance-focused culture. As such, we ask that you agree to our <a href="/networkterms">Network Terms</a>, as a user of the WORBLI Network, but also our <a href="/developerterms">Developer Terms</a> which are set out below as a schedule to the <a href="/networkterms">Network Terms</a>.</li>
          </ul>
          <p>In time, we may adapt and update aspects of the <a href="/platformterms">Platform Terms</a>, <a href="/networkterms">Network Terms</a>, <a href="/developerterms">Developer Terms</a></strong> and/or our <a href="/privacy">Privacy Policy</a> in order to deal with changes to our operations or as required by law. These changes will always be posted to the WORBLI Portal and we will do our best to notify you of the same. Rest assured, no changes will be applicable to you until they have been made available on the WORBLI Portal.</p>
        </div>
      </wbi-center>
      <wbi-footer></wbi-footer>
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
      email: state.email,
    };
  }
} window.customElements.define('wbi-terms', WbiTerms);
