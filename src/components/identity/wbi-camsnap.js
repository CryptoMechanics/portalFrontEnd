import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';

class WbiCamsnap extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
        }
        *:focus {outline:none}
        video {
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
          display: var(--video-display, block);
          border-radius: 3px;
        }
        canvas {
          display: var(--canvas-display, none);
          border-radius: 3px;
        }
        #capture {
          display: var(--capture-display, block);
          position:absolute;
          bottom:25px;
          right: 35px;
          background-color: transparent;
          border: none;
          width: 100px;
          height: 100px;
          z-index: 200;
        }
        #retake {
          display: var(--retake-display, none);
          position:absolute;
          bottom:26px;
          right: 38px;
          z-index: 200;
          width: 100px;
          height: 100px;
          z-index: 200;
          border: none;
          background-color: transparent;
        }
        #upload {
          display: var(--retake-display, none);
          position:absolute;
          bottom:25px;
          left: 20px;
          z-index: 200;
          width: 100px;
          height: 100px;
          z-index: 200;
          border: none;
          background-color: transparent;
        }
        .content{
          position:relative;
          width: 640px;
          height: 480px;
          border-radius: 3px;
        }
        .overlay{
          display: var(--capture-display, block);
          position:absolute;
          top: -6px;
          left: -6px;
          z-index: 100;
          border-radius: 3px;
        }
      </style>

      <template is="dom-if" if="{{showVid}}">
        <div class="content">
          <img src="/images/faceMask.svg" class="overlay">
          <video id="player" autoplay></video>
          <canvas id="canvas" width=640 height=480></canvas>
          <button id="capture" on-click="_capture"><img src="/images/cam.svg"></button>
          <button id="retake" on-click="_retake"><img src="/images/bin2.svg"></button>
          <button id="upload" on-click="_upload"><img src="/images/upload2.svg"></button>
        </div>
      </template>
      
      <template is="dom-if" if="{{!showVid}}">
        <button type="button" on-click="_getCam">Enable camera and take a selfie</button>
      </template>
    `;
  }

  static get properties() {
    return {
      language: {
        type: Text,
        readOnly: true,
      },
      mode: {
        type: Text,
        readOnly: true,
      },
      showVid: {
        type: Boolean,
        value: false,
      },
    };
  }
  _getCam() {
    const constraints = {video: true};
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.shadowRoot.querySelector('#player').srcObject = stream;
        });
    this.showVid = true;
  }

  _capture() {
    this.updateStyles({'--capture-display': 'none'});
    this.updateStyles({'--retake-display': 'block'});
    this.updateStyles({'--video-display': 'none'});
    this.updateStyles({'--canvas-display': 'block'});
    const player = this.shadowRoot.querySelector('#player');
    const canvas = this.shadowRoot.querySelector('#canvas');
    const context = canvas.getContext('2d');
    context.save();
    context.scale(-1, 1);
    context.drawImage(player, 0, 0, canvas.width*-1, canvas.height);
    context.restore();
  }

  _retake() {
    this.updateStyles({'--capture-display': 'block'});
    this.updateStyles({'--retake-display': 'none'});
    this.updateStyles({'--video-display': 'block'});
    this.updateStyles({'--canvas-display': 'none'});
  }
} window.customElements.define('wbi-camsnap', WbiCamsnap);
