import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';

class WbiMobisnap extends PolymerElement {
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
        h1 {
            color: #63656F;
            text-transform: capitalize;
        }
        #capture {
          display: var(--capture-display, block);
          background-color: #91CC7F;
        }
        #retake {
          display: var(--retake-display, none);
          background-color: white;
          margin-right: 12px;
          border: 1px solid #91CC7F;
          color: #91CC7F;
          flex: 3;
        }
        #upload {
          display: var(--retake-display, none);
          background-color: #91CC7F;
          flex: 5;
        }
        #image {
          display: var(--image-display, none);
          max-width: calc(100vw - 50px);
        }
        .content {
          position:relative;
          border-radius: 3px;
        }
        .overlay {
          display: var(--capture-display, block);
          max-width: calc(100vw - 50px);
          position:absolute;
          z-index: 100;
          border-radius: 3px;
        }
        video {
            max-width: calc(100vw - 50px);
        }
        .openCamera {
          width: 400px;
        }
        .container {
            max-width: calc(100vw - 50px);
            display: flex;
        }
        .error {
          padding: 12px 0;
        }
      </style>
      <wbi-api id='api'></wbi-api>
      <h1>[[displayTitle]]</h1>
      <p>[[description]]</p>
      <template is="dom-if" if="{{showVid}}">
        <div class="content">
          <template is="dom-if" if="{{selfie}}">
            <img src="/images/faceMask.svg" class="overlay">
          </template>
          <video id="player" autoplay></video>
          <canvas id="canvas" width=640 height=480></canvas>
            <img id="image" src="[[base64]]">
          <button id="capture" on-click="_capture">TAKE A PHOTO</button>

          <div class="container">
            <button id="retake" on-click="_retake">REDO</button>
            <button id="upload" on-click="_upload">CONFIRM</button>
          </div>

          <template is="dom-if" if="{{selfieError}}">
            <div class="error">[[selfieError]]</div>
          </template>
        </div>
      </template>
    `;
  }

  static get properties() {
    return {
      language: {
        type: String,
        readOnly: true,
      },
      title: {
        type: String,
      },
      mode: {
        type: String,
        readOnly: true,
      },
      showVid: {
        type: Boolean,
        value: false,
      },
      selfie: {
        type: Boolean,
        value: true,
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
        observer: '_title',
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

  _title() {
    if (this.fileName.includes('selfie')) {
      this.displayTitle = 'Take a selfie';
      this.description = 'Make sure your face is the only face in the shot and that its clearly visable with no blur or glare';
    } else {
      this.displayTitle = this.fileName.replace(/_/g, ' ');
      this.description = 'Make sure your details are clear to read, with no blur or glare';
    };
  }

  _stopCam() {
    if (this.stopCam) {
      this.stream.getTracks()[0].stop();
    }
  }

  ready() {
    super.ready();
    const video = this.shadowRoot.querySelector('#player');
    video.style.width = document.width + 'px';
    video.style.height = document.height + 'px';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: {
          facingMode: 'user',
        },
      };
      navigator.mediaDevices.getUserMedia(constraints)
          .then(function success(stream) {
            video.srcObject = stream;
          })
          .catch((err) => {
            alert(err);
          });
    } else {
      alert('navigator.mediaDevices not supported');
    }
    this.showVid = true;
  }

  _upload() {
    localStorage.setItem(this.fileName, this.base64);
    this.$.api.uploadImage(this.blob, this.fileName)
        .then((response) => {
          if (response && response.rejectedDocuments && response.rejectedDocuments.length === 0) {
            const files = JSON.parse(localStorage.getItem('files'));
            if (files && files.length > 0) {
              const country = localStorage.getItem('country');
              this.fileName = `${country}_${files[0].value}`;
              files.shift();
              localStorage.setItem('files', JSON.stringify(files));
              this.selfie = false;
              this._retake();
            } else {
              this.showVid = false;
              this.displayTitle = 'Complete';
              this.description = 'Please return to the desktop';
            }
          } else {
            this._retake();
            this.selfieError = 'Face detection failed. Ensure that your face is clearly visible and that there are no other people in the background.';
          };
        });
    this.upload = true;
  }

  _capture() {
    console.log('Capture');
    this.updateStyles({'--capture-display': 'none'});
    this.updateStyles({'--retake-display': 'block'});
    this.updateStyles({'--video-display': 'none'});
    this.updateStyles({'--canvas-display': 'none'});
    this.updateStyles({'--image-display': 'block'});
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
    this.updateStyles({'--image-display': 'none'});
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
} window.customElements.define('wbi-mobisnap', WbiMobisnap);
