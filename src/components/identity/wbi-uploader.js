import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../components/data/wbi-api.js';
import '../../css/shared-styles.js';

import store from '../../global/store.js';
const ReduxMixin = createMixin(store);

class WbiUploader extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
          min-width: 250px;
          margin-right: 12px;
          position: relative;
        }
        label {
          border: 2px dashed #BDC1C6;
          display: block;
          min-height: 170px;
          max-width: 250px;
          border-radius: 3px;
          background-image: var(--background-image);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center; 
          text-transform: capitalize;
        }
        .delete {
          display: block;
          min-height: 170px;
          width: 250px;
          position:absolute;
          z-index: 999;
          cursor: pointer;
          background-image: url("./images/delete.png");
          background-repeat: no-repeat;
          background-position: center; 
        }
        input {
          width: 0.1px;
          height: 0.1px;
          opacity: 0;
          overflow: hidden;
          position: absolute;
          z-index: -1;
        }
        .title {
          text-transform: capitalize;
        }
        .error {
          padding: 12px 0;
        }
        .webcam {
          cursor: pointer;
        }
        .webcam:hover {
          text-decoration: underline;
        }
        .webcam-image {
          height: 16px;
          position: relative;
          top: 3px;
          margin-right: 6px;
          opacity: 0.8;
        }
      </style>
      <form id="form">
        <wbi-api id='api'></wbi-api>
        <p class="title">[[label]]</p>
        <template is="dom-if" if="{{preview}}">  
          <div class="delete" on-click="_delete"></div>
        </template>
        <label for='[[fileName]]' on-drop="_drop" on-dragover="_allowDrop" class="label">
          <input type='file' name='file' id='[[fileName]]' on-change="_upload"/>
        </label>
        <template is="dom-if" if="{{selfieError}}">  
          <p class="error">[[selfieError]]</p>
        </template>
        <p on-click="_openModal" class="webcam"><img src="./images/webCam.png" class="webcam-image">Use Webcam</p>
      </form>
    `;
  }

  static get properties() {
    return {
      fileName: {
        type: String,
      },
      country: {
        type: String,
      },
      label: {
        type: String,
      },
      completed: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
      },
      preview: {
        type: Boolean,
        value: false,
        observer: '_showAddImageBg',
      },
      selfie: {
        type: Boolean,
        value: false,
      },
      mobiledocs: {
        type: Object,
        observer: '_mobiledocs',
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      mobiledocs: state.mobiledocs,
    };
  }

  ready() {
    super.ready();
    window.addEventListener('clean', () => {
      if (this.fileName != 'selfie') {
        this._removePreview();
      };
    });
    setInterval(() => {
      const savedImage = localStorage.getItem(`${this.country}_${this.fileName}`);
      if (savedImage) {
        this.updateStyles({'--background-image': `url("${savedImage}")`});
        this.completed = true;
        this.preview = true;
      }
    }, 1000);
  }

  _mobiledocs() {
    const fileStatusArray = JSON.parse(this.mobiledocs.files);
    for (let i = 0; i < fileStatusArray.length; i++) {
      if (fileStatusArray[i].uploaded === true) {
        const thisDeviceId = localStorage.getItem('deviceId');
        if (thisDeviceId !== fileStatusArray[i].deviceId && this.fileName === fileStatusArray[i].value) {
          console.log('-------');
          console.log('this file was uploaded on mobile:');
          console.log(fileStatusArray[i]);
          this.updateStyles({'--background-image': `url("./images/fromMobile.png")`});
          this.preview = true;
        }
      };
    }
  }

  _showAddImageBg() {
    if (!this.preview) {
      this.updateStyles({'--background-image': `url("./images/plus.png")`});
    }
  }
  _openModal() {
    this.selfie = false;
    if (this.fileName === '_selfie') {
      this.selfie = true;
    }
    this.dispatchEvent(new CustomEvent('modal', {bubbles: true, composed: true, detail: {action: this.fileName, fileName: `${this.country}_${this.fileName}`, selfie: this.selfie}}));
  }
  _allowDrop(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  _drop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dt = e.dataTransfer;
    const files = dt.files;
    console.log(files);
    this._uploadfile(files[0]);
    // TODO: send this to upload
  }
  _removePreview() {
    this.preview = false;
    this.updateStyles({'--background-image': `url("./images/plus.png")`});
    this.shadowRoot.querySelector(`#form`).reset();
    localStorage.removeItem(`${this.country}_${this.fileName}`);
  }
  _delete(e) {
    this.preview = false;
    this.updateStyles({'--background-image': `url("./images/plus.png")`});
    this.shadowRoot.querySelector(`#form`).reset();
    localStorage.removeItem(`${this.country}_${this.fileName}`);
    this.$.api.deleteImage(`${this.country}_${this.fileName}`)
        .then((response) => {
          console.log('Delete response');
          console.log(response);
        });
  }
  _upload(e) {
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
            localStorage.setItem(`${this.country}_${target}`, dataUrl);
            this.updateStyles({'--background-image': `url("${dataUrl}")`});
            this.preview = true;
            const resizedImage = this._dataURLToBlob(dataUrl);
            console.log(resizedImage);
            this.$.api.uploadImage(resizedImage, `${this.country}_${target}`)
                .then((response) => {
                  console.log(response);
                  console.log(response.rejectedDocuments);
                  console.log(response.rejectedDocuments.length);
                  if (response.rejectedDocuments.length === 0) {
                    this.completed = response.completed;
                  } else {
                    this._delete(target);
                    this.selfieError = 'Face detection failed. Ensure that your face is clearly visible and that there are no other people in the background.';
                  };
                });
          };
          image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  _uploadfile(file) {
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
          localStorage.setItem(`${this.country}_${this.fileName}`, dataUrl);
          this.updateStyles({'--background-image': `url("${dataUrl}")`});
          this.preview = true;
          const resizedImage = this._dataURLToBlob(dataUrl);
          this.$.api.uploadImage(resizedImage, `${this.country}_${this.fileName}`)
              .then((response) => {
                console.log(response);
                console.log(response.rejectedDocuments);
                console.log(response.rejectedDocuments.length);
                if (response.rejectedDocuments.length === 0) {
                  this.completed = response.completed;
                } else {
                  this._delete(target);
                  this.selfieError = 'Face detection failed. Ensure that your face is clearly visible and that there are no other people in the background.';
                };
              });
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  _getOrientation(file) {
    // this._getOrientation(file)
    // .then((orientation) => {
    //   alert('orientation: ' + orientation);
    // });
    // https://medium.com/wassa/handle-image-rotation-on-mobile-266b7bd5a1e6
    // https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) {
          resolve(-2);
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
          if (view.getUint16(offset+2, false) <= 8) resolve(-1);
          const marker = view.getUint16(offset, false);
          offset += 2;
          if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
              resolve(-1);
            }
            const little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker & 0xFF00) != 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      };
      reader.readAsArrayBuffer(file);
    });
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
} window.customElements.define('wbi-uploader', WbiUploader);
