import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';

class WbiCamsnap extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
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
        .content {
          position:relative;
          width: 640px;
          height: 480px;
          border-radius: 3px;
        }
        .overlay {
          display: var(--capture-display, block);
          position:absolute;
          top: -6px;
          left: -6px;
          z-index: 100;
          border-radius: 3px;
        }
        video {
          object-fit: cover;
          width: 640px;
          height: 480px;
        }
        .openCamera {
          width: 400px;
        }
        .error {
          padding: 12px;
        }
      </style>
      <wbi-api id='api'></wbi-api>
      <template is="dom-if" if="{{showVid}}">
        <div class="content">
          <template is="dom-if" if="{{selfie}}">
            <img src="/images/faceMask.svg" class="overlay">
          </template>
          <video id="player" autoplay></video>
          <canvas id="canvas" width=640 height=480></canvas>
          <button id="capture" on-click="_capture"><img src="/images/cam.svg"></button>
          <button id="retake" on-click="_retake"><img src="/images/bin2.svg"></button>
          <button id="upload" on-click="_upload"><img src="/images/upload2.svg"></button>
        </div>
        <p class="error">[[selfieError]]</p>
      </template>
      
      <template is="dom-if" if="{{!showVid}}">
        <button type="button" on-click="_getCam" class="openCamera">Enable camera and take a picture</button>
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
      selfie: {
        type: Boolean,
        value: false,
      },
      upload: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribue: true,
      },
      base64: {
        type: String,
        notify: true,
        reflectToAttribue: true,
      },
      blob: {
        type: Object,
        notify: true,
        reflectToAttribue: true,
      },
      fileName: {
        type: String,
      },
      stopCam: {
        type: Boolean,
        observer: '_stopCam',
      },
      closenow: {
        type: Boolean,
        notify: true,
        reflectToAttribue: true,
      },
    };
  }

  _stopCam() {
    if (this.stopCam) {
      this.stream.getTracks()[0].stop();
    }
  }

  _getCam() {
    const constraints = {video: {width: 800, height: 600}};
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.stream = stream;
          this.shadowRoot.querySelector('#player').srcObject = this.stream;
        });
    this.showVid = true;
  }
  _upload() {
    localStorage.setItem(this.fileName, this.base64);
    this.$.api.uploadImage(this.blob, this.fileName)
        .then((response) => {
          if (response.rejectedDocuments.length === 0) {
            this.closenow = true;
          } else {
            this._retake();
            this.selfieError = 'Face detection failed. Ensure your face is clearly visible and no other people in the background.';
          };
        });
    this.upload = true;
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
    this.base64 = canvas.toDataURL('image/jpeg');
    this.blob = this._dataURLToBlob(this.base64);
  }

  _retake() {
    this.updateStyles({'--capture-display': 'block'});
    this.updateStyles({'--retake-display': 'none'});
    this.updateStyles({'--video-display': 'block'});
    this.updateStyles({'--canvas-display': 'none'});
  }

  _dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];
      return new Blob([raw], {type: contentType});
    }
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
} window.customElements.define('wbi-camsnap', WbiCamsnap);
