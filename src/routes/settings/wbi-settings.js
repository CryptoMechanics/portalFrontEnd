import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {setPassiveTouchGestures, setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';


setPassiveTouchGestures(true);
setRootPath(MyAppGlobals.rootPath);

class WbiSettings extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]settings/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <main>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <wbi-home name="home"></wbi-home>  
          <wbi-profile name="profile"></wbi-profile>
          <wbi-identity name="identity"></wbi-identity>
          <wbi-network name="network"></wbi-network>
        </iron-pages>
      </main>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    } else if (['home', 'profile', 'identity', 'network'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'error';
    }
  }

  _pageChanged(page) {
    window.scrollTo(0, 0);
    switch (page) {
      case 'home':
        import('./wbi-home.js');
        break;
      case 'profile':
        import('./wbi-profile.js');
        break;
      case 'identity':
        import('./wbi-identity.js');
        break;
      case 'network':
        import('./wbi-network.js');
        break;
      case 'error':
        import('../wbi-error.js');
        break;
    }
  }
}
window.customElements.define('wbi-settings', WbiSettings);
