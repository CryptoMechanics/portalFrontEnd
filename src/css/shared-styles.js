import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    * {
      box-sizing: border-box;
      outline:0;
    }
      .card {
        margin: 24px;
        padding: 48px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        max-width: 1200px;
        margin: 0 auto;
        max-width: 500px;
        width: 100%;
        box-sizing: border-box;  
      }

      a, button {
        cursor: pointer;
      }
      input[type=text], input[type=password] {
        background-color: #F8F8F8;
        border: 1px solid #BEC1C5;
        display: block;
        width: 100%;
        border-radius: 4px;
        padding: 12px;
        font-size: 14px;
      }
      input[type=text]:focus, input[type=password]:focus {
        background-color: #F8F8F8;
        border: 1px solid #92CC85;
        display: block;
        width: 100%;
        border-radius: 4px;
        padding: 12px;
        font-size: 14px;
      }
      input[type=checkbox] {
        background-color: #F8F8F8;
        border: 1.5px solid #92CC85;
      }

      label {
        display: block;
        font-size: 14px;
        margin-bottom: 6px;
        margin-top: 12px;
      }
      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #B1B2C4;
        margin: 1em 0;
        padding: 0; 
      }
      button {
        display: block;
        width: 100%;
        height: 48px;
        text-transform: uppercase;
        color: white;
        font-size: 16px;
        font-weight: 600;
        border-radius: 4px;
        background-color: #5B83D2;
        border: transparent;
        margin-top: 18px;
      }
      .inactive-bg{
        background-color: #BDC1C6;
      }
      .green-bg{
        background-color: #92CC7F;
      }
      .white-bg{
        background-color: #FFFFFF;
        color: #92CC7F;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
