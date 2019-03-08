import {createMixin} from '../node_modules/polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';

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

      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <wbi-signin name="signin"></wbi-signin>
        <wbi-join name="join"></wbi-join>
        <wbi-forgot name="forgot"></wbi-forgot>
        <wbi-sent name="sent"></wbi-sent>
        <wbi-set name="set"></wbi-set>
        <wbi-settings name="settings"></wbi-settings>
        <wbi-error name="error"></wbi-error>
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
      routeData: Object,
      subroute: Object,
    };
  }

  static mapStateToProps(state, element) {
    return {
      env: state.env,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'signin';
    } else if (['signin', 'join', 'forgot', 'sent', 'set', 'settings'].indexOf(page) !== -1) {
      this.page = page;
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
      case 'settings':
        import('./routes/settings/wbi-settings.js');
        break;
      case 'error':
        import('./routes/wbi-error.js');
        break;
    }
  }
} window.customElements.define('app-shell', AppShell);
