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
        label {
          width: 100%;
          display: block;
          min-height: 50px;
          border-radius: 3px;
          background-color: #5284CE;
          text-transform: uppercase;
          color: white;
          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
          cursor: pointer;
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
      </style>
      <wbi-socket></wbi-socket>
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
          <h1>[[txt.uploadDocuments]]</h1>
          <p>[[txt.SelectTheDocumentBelow]]</p>
        </template>

        <template is="dom-if" if="{{completed}}">
          <h1>[[txt.allDone]]</h1>
          <p>[[txt.returnToTheDesktopToComplete]]</p>
        </template>

        <form id="form">
          <template is="dom-if" if="{{selfie}}">
            <label for="selfie">[[txt.selfie]]
              <input type="file" accept="image/*" id="selfie" on-change="_upload" capture="user">
            </label>
          </template>
          <template is='dom-repeat' items='[[files]]' id="repeat">
            <label for="[[item.value]]">[[item.label]]
              <input type="file" accept="image/*" id="[[item.value]]" on-change="_upload" capture="environment">
            </label>
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
      mobiledocs: {
        type: Array,
        observer: '_mobiledocs',
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
      mobiledocs: state.mobiledocs,
    };
  }

  ready() {
    super.ready();
    this._swapToken();
    this._findSelfie();
  }

  _language(e) {
    this.txt = translations[this.language];
  }
  _routeChanged() {
    this.token = this.route.__queryParams.token;
    this._findSelfie();
  }

  _mobiledocs() {
    this.country = this.mobiledocs.country;
    this.files = JSON.parse(this.mobiledocs.files);
    this.set('files', JSON.parse(this.mobiledocs.files));
    this.$.repeat.render();
    localStorage.setItem('files', JSON.stringify(this.files));
    localStorage.setItem('country', this.country);
    console.log(this.mobiledocs);
    console.log(this.mobiledocs.country);
    console.log(JSON.parse(this.mobiledocs.files));
  }

  _findSelfie() {
    this.country = localStorage.getItem('country');
    this.files = JSON.parse(localStorage.getItem('files'));
    if (localStorage.getItem('selfieComplete')) {
      this.selfie = false;
    } else {
      this.selfie = true;
    }
  }

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
                  console.log(response);
                  if (response && response.rejectedDocuments && response.rejectedDocuments.length === 0) {
                    this.completed = response.completed;
                    this.loading = false;
                    if (target === 'selfie') {
                      localStorage.setItem('selfieComplete', true);
                      this.selfie = false;
                    } else {
                      const fileArray = this.files;
                      for (let i = 0; i < fileArray.length; i++) {
                        if ( fileArray[i].value === target) {
                          fileArray.splice(i, 1);
                        }
                      }
                      if (fileArray && fileArray.length > 0) {
                        localStorage.setItem('files', JSON.stringify(fileArray));
                      } else {
                        localStorage.removeItem('files');
                        this.completed = true;
                      }
                      this.files = fileArray;
                      this.set('files', fileArray);
                      this.$.repeat.render();
                    }
                  } else {
                    this._delete(target);
                    this.selfieError = this.txt.faceDetectionFailed;
                  };
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

  _swapToken() {
    const token = this.route.path.split('/')[2];
    const files = localStorage.getItem('files');
    if (token && !files) {
      this.$.api.swapToken(token)
          .then((response) => {
            console.log(response);
            if (response && response.data === false && response.error) {
              this.country = localStorage.getItem('country');
              this.files = JSON.parse(localStorage.getItem('files'));
              this.jwt = localStorage.getItem('jwt');
            } else if (response && response.data === true) {
              localStorage.setItem('country', response.country);
              localStorage.setItem('files', response.files);
              localStorage.setItem('jwt', response.jwt);
              this.country = response.country;
              this.files = JSON.parse(response.files);
              this.jwt = response.jwt;
            }
            if (!this.files) {
              this.allowAccess = false;
              this.completed = true;
            }
          });
    }
  }
} window.customElements.define('wbi-id', WbiId);
