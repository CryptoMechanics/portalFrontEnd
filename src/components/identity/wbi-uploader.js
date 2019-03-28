import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';

class WbiUploader extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
        }
        label {
          border: 3px dashed #BDC1C6;
          display: block;
          min-height: 170px;
          max-width: 250px;
          border-radius: 3px;
        }
        input {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
      </style>
        <label for='[[item.value]]' style="text-transform: capitalize">[[item.label]]
        <input type='file' name='file' id='[[item.value]]' on-change="_upload"/>
        </label>
    `;
  }

  static get properties() {
    return {
      fileName: {
        type: String,
      },
    };
  }
} window.customElements.define('wbi-uploader', WbiUploader);
