import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../../css/shared-styles.js';

class WbiCamsnap extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: box;
        }
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
          bottom:25px;
          right: 50%;
          z-index: 200;
        }
        .content{
          position:relative;
          width: 640px;
          border-radius: 3px;
        }
        .overlay{
          position:absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          z-index: 100;
          border-radius: 3px;
        }
      </style>

      <template is="dom-if" if="{{showVid}}">
        <div class="content">
        <svg width="640px" height="480px" viewBox="0 0 640 480" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="overlay">
              <title>Combined Shape</title>
              <desc>Created with Sketch.</desc>
              <defs>
                  <path d="M488,252 L1128,252 L1128,732 L488,732 L488,252 Z M927.688935,481.318919 L931.413286,432.914392 C931.413286,369.61246 870.908631,318.322364 807.654858,318.322364 C744.356939,318.322364 683.89643,369.61246 683.89643,432.914392 L687.616768,481.274773 C684.077029,482.129608 680.882435,483.750985 678.213584,486.038572 C673.26116,490.25656 670.146832,496.48923 670.146832,503.500482 L670.146832,527.335527 C670.146832,539.937319 680.292478,550.159219 692.922364,550.239485 C692.922364,610.005692 764.720472,666.661583 807.634792,666.677636 L807.638805,666.677636 L807.654858,666.677636 C842.518479,666.677636 896.473413,629.273591 915.476434,583.184744 C915.564727,582.964012 915.636966,582.74328 915.729272,582.522548 C919.947261,572.087943 922.387353,561.2199 922.387353,550.243498 C934.969079,550.155206 945.146832,539.945346 945.146832,527.343554 L945.146832,503.508508 C945.146832,492.744812 937.698129,483.779078 927.688935,481.318919 Z" id="path-1"></path>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Desktop-HD" transform="translate(-488.000000, -252.000000)">
                      <g id="Combined-Shape">
                          <use fill-opacity="0.52623981" fill="#000000" fill-rule="evenodd" xlink:href="#path-1"></use>
                          <path stroke="#000000" stroke-width="2" d="M489,253 L1127,253 L1127,731 L489,731 L489,253 Z M928.749875,480.565308 L932.410339,432.991108 C932.413286,370.62487 873.204471,317.322364 807.654858,317.322364 C742.076301,317.322364 682.89643,370.61158 682.89643,432.914392 L686.555594,480.517319 C683.194812,481.451937 680.145544,483.065528 677.562793,485.279315 C672.247112,489.806683 669.146832,496.376695 669.146832,503.500482 L669.146832,527.335527 C669.146832,540.163342 679.217495,550.618725 691.928679,551.213277 C692.289113,579.03354 708.054538,607.977721 733.505456,631.597846 C757.140033,653.532288 786.027136,667.669554 807.634418,667.677636 L807.638805,667.677636 L807.654858,667.677636 C844.897196,667.677636 898.119806,627.903935 916.400934,583.565927 C916.442251,583.462783 916.469052,583.391458 916.526385,583.235524 C916.533123,583.2172 916.533123,583.2172 916.539764,583.199153 C916.589806,583.063236 916.619409,582.985937 916.651852,582.908354 C920.942515,572.294149 923.246135,561.662778 923.381063,551.216574 C936.062929,550.613106 946.146832,540.154151 946.146832,527.343554 L946.146832,503.508508 C946.146832,492.743563 938.944504,483.454536 928.749875,480.565308 Z"></path>
                      </g>
                  </g>
              </g>
          </svg>
          <video id="player" autoplay></video>
          <canvas id="canvas" width=640 height=480></canvas>
          <button id="capture" on-click="_capture">
          


            <svg width="106px" height="106px" viewBox="0 0 106 106" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Take Photo</title>
                <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                        <stop stop-color="#F0F0F0" offset="0%"></stop>
                        <stop stop-color="#8E8D94" offset="100%"></stop>
                    </linearGradient>
                    <path d="M50,91.8918919 C26.863747,91.8918919 8.10810811,73.136253 8.10810811,50 C8.10810811,26.863747 26.863747,8.10810811 50,8.10810811 C73.136253,8.10810811 91.8918919,26.863747 91.8918919,50 C91.8918919,73.136253 73.136253,91.8918919 50,91.8918919 Z M58.1900518,39.4425676 L54.551107,35.8108108 L45.448893,35.8108108 L41.8099482,39.4425676 L35.4442208,39.4425676 C33.4355233,39.4425676 31.805276,41.0695946 31.805276,43.0743243 L31.805276,61.2331081 C31.805276,63.2378378 33.4355233,64.8648649 35.4442208,64.8648649 L64.5557792,64.8648649 C66.5644767,64.8648649 68.194724,63.2378378 68.194724,61.2331081 L68.194724,43.0743243 C68.194724,41.0695946 66.5644767,39.4425676 64.5557792,39.4425676 L58.1900518,39.4425676 Z" id="path-2"></path>
                    <filter x="-6.0%" y="-4.8%" width="111.9%" height="111.9%" filterUnits="objectBoundingBox" id="filter-3">
                        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-4">
                        <stop stop-color="#EDEDED" offset="0%"></stop>
                        <stop stop-color="#909196" offset="100%"></stop>
                    </linearGradient>
                    <path d="M50,100 C22.3857625,100 0,77.6142375 0,50 C0,22.3857625 22.3857625,0 50,0 C77.6142375,0 100,22.3857625 100,50 C100,77.6142375 77.6142375,100 50,100 Z M50,95.9459459 C75.3752453,95.9459459 95.9459459,75.3752453 95.9459459,50 C95.9459459,24.6247547 75.3752453,4.05405405 50,4.05405405 C24.6247547,4.05405405 4.05405405,24.6247547 4.05405405,50 C4.05405405,75.3752453 24.6247547,95.9459459 50,95.9459459 Z" id="path-5"></path>
                    <filter x="-5.0%" y="-4.0%" width="110.0%" height="110.0%" filterUnits="objectBoundingBox" id="filter-6">
                        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <linearGradient x1="50%" y1="0.442442602%" x2="50%" y2="100%" id="linearGradient-7">
                        <stop stop-color="#CDCED0" offset="0%"></stop>
                        <stop stop-color="#AEAFB4" offset="100%"></stop>
                    </linearGradient>
                    <ellipse id="path-8" cx="50" cy="52.1585586" rx="5.46326912" ry="5.45247748"></ellipse>
                    <filter x="-91.5%" y="-82.5%" width="283.0%" height="283.4%" filterUnits="objectBoundingBox" id="filter-9">
                        <feMorphology radius="5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="1" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feMorphology radius="1" operator="erode" in="SourceAlpha" result="shadowInner"></feMorphology>
                        <feOffset dx="0" dy="1" in="shadowInner" result="shadowInner"></feOffset>
                        <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1"></feComposite>
                        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Desktop-HD" transform="translate(-782.000000, -506.000000)">
                        <g id="Photo" transform="translate(785.000000, 508.000000)">
                            <g id="Combined-Shape">
                                <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
                                <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
                            </g>
                            <g id="Combined-Shape">
                                <use fill="black" fill-opacity="1" filter="url(#filter-6)" xlink:href="#path-5"></use>
                                <use fill="url(#linearGradient-4)" fill-rule="evenodd" xlink:href="#path-5"></use>
                            </g>
                            <g id="Oval" fill-rule="nonzero">
                                <use fill="black" fill-opacity="1" filter="url(#filter-9)" xlink:href="#path-8"></use>
                                <ellipse stroke="url(#linearGradient-7)" stroke-width="5" cx="50" cy="52.1585586" rx="7.96326912" ry="7.95247748"></ellipse>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
          </button>
          <button id="retake" on-click="_retake">Retake</button>
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
