import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {translations} from '../translations/languages.js';
import '@polymer/app-route/app-location.js';
import '../css/shared-styles.js';
import '../components/data/wbi-api.js';
import '../components/identity/wbi-mobisnap.js';
import '../components/loading/ball-spin3x.js';
import '../components/data/wbi-socket.js';

import store from '../global/store.js';
const ReduxMixin = createMixin(store);

class WbiId extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        div {
          text-align: center;
          margin: 24px;
        }
        h1 {
          margin: 0 auto;
          color: #63656F;
          margin: 44px 0;
        }
        img {
          width: 100%;
          max-width: 360px;
          margin: 21px 0;
        }
        .blue {
          width: 100%;
          display: block;
          min-height: 50px;
          border-radius: 3px;
          background-color: #BCC1C5;
          text-transform: uppercase;
          color: white;
          font-size: 14px;
          font-weight: 600;
          line-height: 50px;
          cursor: pointer;
          text-align: left;
          padding-left: 12px;
        }
        .green {
          width: 100%;
          display: block;
          min-height: 50px;
          border-radius: 3px;
          background-color: #7DD084;
          text-transform: uppercase;
          color: white;
          font-size: 14px;
          font-weight: 600;
          line-height: 50px;
          cursor: pointer;
          text-align: left;
          padding-left: 12px;
        }
        input {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
        .cover-all {
          background-color: #F9F9F9;
          position:fixed;
          left:0px;
          right: 0px;
          top:0px;
          bottom:0px;
          z-index:1000;
        }
        ball-spin3x {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          display: inline-block;
        }
        .error {
          padding: 12px 12px;
          margin-left: 0px;
          margin-right: 0px;
          text-transform: capitalize;
          text-align: left;
          border: 0;
          background: 0;
          position: relative;
          top: -25px;
          left: -10px;
        }
        .icon {
          height: 25px;
          margin: 0;
          width: 25px;
          position: fixed;
          right: 40px;
          margin-top: 12px;
        }
        .logo {
          width: 80px;
          height: 25px;
        }
        .logocontainer {
          display: block;
          height: 60px;
        }
      </style>
      <template is="dom-if" if="{{socket}}">
        <wbi-socket></wbi-socket>
      </template>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
      <wbi-api id='api'></wbi-api>
      <div>
      
        <template is="dom-if" if="{{loading}}">
          <div class="cover-all">
            <h1>[[txt.uploadingImage]]</h1>
            <ball-spin3x spinsize="la-2x"></ball-spin3x>
          </div>
        </template>

        <template is="dom-if" if="{{!completed}}">
          <div class="logocontainer"><img src="./images/worbli.png" class="logo" class="logo"></div>
          <h1>[[txt.uploadDocuments]]</h1>
          <p>[[txt.SelectTheDocumentBelow]]</p>
        </template>

        <template is="dom-if" if="{{completed}}">
          <h1>[[txt.allDone]]</h1>
          <p>[[txt.returnToTheDesktopToComplete]]</p>
        </template>

        <form id="form">
          <template is='dom-repeat' items='[[files]]' id="repeat">
            
            <template is="dom-if" if="{{!item.uploaded}}">
              <label for="[[item.value]]" class="blue">[[item.label]]
                <input type="file" accept="image/*" id="[[item.value]]" on-change="_upload" capture="environment">
                <img src="./images/upload.svg" class="icon">
              </label>
            </template>

            <template is="dom-if" if="{{item.uploaded}}">
              <label for="[[item.value]]" class="green">[[item.label]]
                <input type="file" accept="image/*" id="[[item.value]]" on-change="_upload" capture="environment">
                <img src="./images/done.svg" class="icon">
              </label>
            </template>
            
            <template is="dom-if" if="{{item.error}}">
              <div class="error">[[item.error]]</div>
            </template>
          </template>
        </form>

        <template is="dom-if" if="{{selfieError}}">
          <div class="error">[[selfieError]]</div>
        </template>


      </div>
    `;
  }

  static get properties() {
    return {
      env: {
        type: Object,
        readOnly: true,
      },
      allowAccess: {
        type: Boolean,
        value: true,
      },
      socket: {
        type: Boolean,
        value: false,
      },
      country: {
        type: String,
      },
      files: {
        type: Array,
      },
      jwt: {
        type: String,
      },
      selfie: {
        type: Boolean,
        value: true,
      },
      completed: {
        type: Boolean,
        value: false,
      },
      loading: {
        type: Boolean,
        value: false,
      },
      imagestatus: {
        type: Object,
        observer: '_imagestatus',
      },
      language: {
        type: String,
        readOnly: true,
        observer: '_language',
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      color: state.color,
      env: state.env,
      imagestatus: state.imagestatus,
    };
  }

  ready() {
    super.ready();
    const token = this.route.path.split('/')[2];
    const jwt = localStorage.getItem('jwt');
    if (token) {
      this.$.api.swapToken(token)
          .then((response) => {
            localStorage.setItem('jwt', response.jwt);
            this.socket = true;
            this.set('route.path', '/id/');
          });
    } else if (!token && jwt) {
      this.socket = true;
    }
  }

  _language(e) {
    this.txt = translations[this.language];
  }
  _imagestatus() {
    console.log('this.imagestatus');
    console.log(this.imagestatus);
    this.country = this.imagestatus.country;
    this.files = JSON.parse(this.imagestatus.files);
  }
  // _mobiledocs() {
  //   this.country = this.mobiledocs.country;
  //   this.files = JSON.parse(this.mobiledocs.files);
  //   this.set('files', JSON.parse(this.mobiledocs.files));
  //   this.$.repeat.render();
  //   localStorage.setItem('files', JSON.stringify(this.files));
  //   localStorage.setItem('country', this.country);
  //   console.log(this.mobiledocs);
  //   console.log(this.mobiledocs.country);
  //   console.log(JSON.parse(this.mobiledocs.files));
  // }

  _upload(e) {
    this.loading = true;
    this.selfieError = '';
    if (e && e.target && e.target.id) {
      const target = e.target.id;
      const file = this.shadowRoot.querySelector(`#${target}`).files[0];
      if (file.type.match(/image.*/)) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const image = new Image();
          image.onload = (imageEvent) => {
            const canvas = document.createElement('canvas');
            const maxSize = 800;
            let width = image.width;
            let height = image.height;
            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(image, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            const resizedImage = this._dataURLToBlob(dataUrl);
            this.$.api.uploadImage(resizedImage, `${this.country}_${target}`)
                .then((response) => {
                  this.loading = false;
                });
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
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
} window.customElements.define('wbi-id', WbiId);
