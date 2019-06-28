import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';

class WbiImpersonate extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 10px 20px;
        }
      </style>
        <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
        Impersonate
    `;
  }

  static get properties() {
    return {
      route: {
        type: Object,
        observer: '_route',
      },
    };
  }

  _route() {
    localStorage.setItem('jwt', this.route.__queryParams.jwt);
    this.set('route.path', '/profile/');
  }
} window.customElements.define('wbi-impersonate', WbiImpersonate);
