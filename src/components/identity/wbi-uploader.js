import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../components/data/wbi-api.js';
import '../../css/shared-styles.js';

class WbiUploader extends PolymerElement {
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
        .delete{
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
        .title{
          text-transform: capitalize;
        }
        .error{
          padding: 12px 0;
        }
      </style>
        <wbi-api id='api'></wbi-api>
        <p class="title">[[label]]</p>
        <template is="dom-if" if="{{preview}}">  
          <div class="delete" on-click="_delete"></div>
        </template>
        <label for='[[fileName]]' on-drop="_drop"  on-dragover="_allowDrop">
          <input type='file' name='file' id='[[fileName]]' on-change="_upload"/>
        </label>
        <template is="dom-if" if="{{selfieError}}">  
          <p class="error">[[selfieError]]</p>
        </template>
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
      },
    };
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
    // TODO: send this to upload
  }
  _delete(target) {
    this.preview = false;
    this.updateStyles({'--background-image': `none`});
    this.shadowRoot.querySelector(`#${target}`).value = '';
  }
  _upload(e) {
    // TODO: Split this function out for drag and drop
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
            localStorage.setItem(target, dataUrl);
            this.updateStyles({'--background-image': `url("${dataUrl}")`});
            this.preview = true;
            const resizedImage = this._dataURLToBlob(dataUrl);
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
