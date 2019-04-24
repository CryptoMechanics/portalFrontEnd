import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';

class WbiCenter extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <slot></slot>
    `;
  }
} window.customElements.define('wbi-center', WbiCenter);
