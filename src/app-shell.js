import {createMixin} from '../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import './components/wbi-modal.js';

import store from './global/store.js';
const ReduxMixin = createMixin(store);

setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);

class AppShell extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <wbi-modal></wbi-modal>
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <wbi-signin name="signin"></wbi-signin>
        <wbi-join name="join"></wbi-join>
        <wbi-forgot name="forgot"></wbi-forgot>
        <wbi-sent name="sent"></wbi-sent>
        <wbi-set name="set"></wbi-set>
        <wbi-error name="error"></wbi-error>
        <wbi-verify name="verify"></wbi-verify>
        <wbi-home name="home"></wbi-home>
        <wbi-identity name="identity"></wbi-identity>
        <wbi-network name="network"></wbi-network>
        <wbi-profile name="profile"></wbi-profile>
        <wbi-id name="id"></wbi-id>
        <wbi-terms name="terms"></wbi-terms>
        <wbi-platformterms name="platformterms"></wbi-platformterms>
        <wbi-networkterms name="networkterms"></wbi-networkterms>
        <wbi-developerterms name="developerterms"></wbi-developerterms>
        <wbi-privacy name="privacy"></wbi-privacy>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      env: {
        type: Object,
      },
      status: {
        type: String,
        readOnly: true,
      },
      routeData: Object,
      subroute: Object,
    };
  }

  static mapStateToProps(state, element) {
    return {
      env: state.env,
      status: state.status,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    const jwt = localStorage.getItem('jwt');
    if (!page && jwt) {
      this.page = 'home';
    } else if (!page && !jwt) {
      this.set('route.path', '/signin/');
    } else if ([
      'signin',
      'join',
      'forgot',
      'sent',
      'set',
      'verify',
      'home',
      'identity',
      'network',
      'profile',
      'id',
      'terms',
      'platformterms',
      'networkterms',
      'developerterms',
      'privacy',
    ].indexOf(page) !== -1) {
      this.page = page;
      if (this.page === 'home' && !jwt || this.page == 'identity' && !jwt || this.page === 'network' && !jwt|| this.page === 'profile' && !jwt) {
        this.set('route.path', '/signin/');
      }
    } else {
      this.page = 'error';
    }
  }

  _pageChanged(page) {
    window.scrollTo(0, 0);
    switch (page) {
      case 'signin':
        import('./routes/wbi-signin.js');
        break;
      case 'join':
        import('./routes/wbi-join.js');
        break;
      case 'forgot':
        import('./routes/wbi-forgot.js');
        break;
      case 'sent':
        import('./routes/wbi-sent.js');
        break;
      case 'set':
        import('./routes/wbi-set.js');
        break;
      case 'home':
        import('./routes/wbi-home.js');
        break;
      case 'identity':
        import('./routes/wbi-identity.js');
        break;
      case 'network':
        import('./routes/wbi-network.js');
        break;
      case 'profile':
        import('./routes/wbi-profile.js');
        break;
      case 'verify':
        import('./routes/wbi-verify.js');
        break;
      case 'id':
        import('./routes/wbi-id.js');
        break;
      case 'terms':
        import('./routes/wbi-terms.js');
        break;
      case 'platformterms':
        import('./routes/wbi-platformterms.js');
        break;
      case 'networkterms':
        import('./routes/wbi-networkterms.js');
        break;
      case 'developerterms':
        import('./routes/wbi-developerterms.js');
        break;
      case 'privacy':
        import('./routes/wbi-privacy.js');
        break;
      case 'error':
        import('./routes/wbi-error.js');
        break;
    }
  }
} window.customElements.define('app-shell', AppShell);
