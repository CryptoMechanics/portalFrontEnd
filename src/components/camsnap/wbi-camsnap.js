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
          height: 480px;
          border-radius: 3px;
        }
        .overlay{
          position:absolute;
          top: -6px;
          left: -6px;
          z-index: 100;
          border-radius: 3px;
        }
      </style>

      <template is="dom-if" if="{{showVid}}">
        <div class="content">
          <svg width="654px" height="494px" viewBox="0 0 654 494" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="overlay";>
            <defs>
              <path d="M488,257.006027 C488,254.241275 490.238593,252 493.000524,252 L1122.99948,252 C1125.76119,252 1128,254.246882 1128,257.006027 L1128,726.993973 C1128,729.758725 1125.76141,732 1122.99948,732 L493.000524,732 C490.238811,732 488,729.753118 488,726.993973 L488,257.006027 Z M927.688935,481.318919 L931.413286,432.914392 C931.413286,369.61246 870.908631,318.322364 807.654858,318.322364 C744.356939,318.322364 683.89643,369.61246 683.89643,432.914392 L687.616768,481.274773 C684.077029,482.129608 680.882435,483.750985 678.213584,486.038572 C673.26116,490.25656 670.146832,496.48923 670.146832,503.500482 L670.146832,527.335527 C670.146832,539.937319 680.292478,550.159219 692.922364,550.239485 C692.922364,610.005692 764.720472,666.661583 807.634792,666.677636 L807.638805,666.677636 L807.654858,666.677636 C842.518479,666.677636 896.473413,629.273591 915.476434,583.184744 C915.564727,582.964012 915.636966,582.74328 915.729272,582.522548 C919.947261,572.087943 922.387353,561.2199 922.387353,550.243498 C934.969079,550.155206 945.146832,539.945346 945.146832,527.343554 L945.146832,503.508508 C945.146832,492.744812 937.698129,483.779078 927.688935,481.318919 Z" id="path-1"></path>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Desktop-HD" transform="translate(-481.000000, -245.000000)">
                    <g id="Combined-Shape">
                        <use fill-opacity="0.75" fill="#000000" fill-rule="evenodd" style="mix-blend-mode: color;" xlink:href="#path-1"></use>
                        <path stroke="#FFFFFF" stroke-width="7" d="M484.5,257.006027 L484.5,726.993973 C484.5,731.686585 488.306278,735.5 493.000524,735.5 L1122.99948,735.5 C1127.69521,735.5 1131.5,731.690912 1131.5,726.993973 L1131.5,257.006027 C1131.5,252.313415 1127.69372,248.5 1122.99948,248.5 L493.000524,248.5 C488.304786,248.5 484.5,252.309088 484.5,257.006027 Z M687.396525,432.781195 C687.481314,373.13178 744.509498,321.822364 807.654858,321.822364 C870.771488,321.822364 927.828327,373.145288 927.913192,432.781174 L924.199249,481.050415 L923.971578,484.009403 L926.853535,484.717758 C935.486227,486.839587 941.646832,494.545803 941.646832,503.508508 L941.646832,527.343554 C941.646832,538.009923 933.033181,546.668705 922.362792,546.743585 L918.887353,546.767974 L918.887353,550.243498 C918.887353,560.398316 916.69539,570.793462 912.48436,581.210854 C912.436256,581.325239 912.387898,581.451515 912.316893,581.644369 C912.309675,581.663981 912.309675,581.663981 912.302822,581.682618 C912.260014,581.799049 912.243229,581.843717 912.226766,581.884876 C903.46426,603.136448 886.402373,623.729245 865.418204,639.41089 C845.449961,654.333325 823.985801,663.177636 807.654858,663.177636 L807.638805,663.177636 L807.634792,663.177636 C787.316317,663.170035 759.439939,649.527416 736.56659,628.299444 C711.659883,605.184382 696.422364,576.946826 696.422364,550.239485 L696.422364,546.761658 L692.944607,546.739556 C682.245464,546.67156 673.646832,538.019468 673.646832,527.335527 L673.646832,503.500482 C673.646832,497.709104 676.158632,492.386179 680.482985,488.70312 C682.740192,486.768394 685.435961,485.402045 688.438387,484.67697 L691.335025,483.977442 L691.106457,481.006313 L687.396525,432.781195 Z"></path>
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
