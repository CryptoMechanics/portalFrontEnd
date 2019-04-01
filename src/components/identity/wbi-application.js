import {createMixin} from 'polymer-redux';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import store from '../../global/store.js';
import '../../css/shared-styles.js';
import '../../components/data/wbi-api.js';
import '../../components/identity/wbi-uploader';

const ReduxMixin = createMixin(store);
class WbiApplication extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include='shared-styles'>
        :host {
          display: box;
          background-color: var(--header-background-color);
          box-shadow: inset 0 1px 0 var(--header-background-color), 0 1px 0px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.05);
          z-index: 8888;
        }
        label {
          display: block;
        }
        .radio_group label{
          display: inline;
        }
        .radio_group{
          margin-bottom: 24px;
        }
        .inner-frame{
          background-color: #F8F8F8;
          border: 1px solid #BDC1C6;
          border-radius: 4px;
          padding: 30px;
          margin: 24px 0;
        }
        .country{
          width: 100%;
        }
        .documents{
          height: 60px;
        }
        h3 {
          text-transform: uppercase;
          color: #92CC85;
          cursor: pointer;
        }
        .bullets {
          padding-right: 12px;
          text-transform: capitalize;
        }
        .green-bg{
          background-color: var(--active-color, #BDC1C6);
          cursor: var(--cursor-type, default);
          pointer-events: var(--pointer-event, none);
        }
        #day, #month, #year {
          max-width: 150px;
        } 
        small {
          display: block;
          text-align: right;
          position: relative;
          top: -10px;
        }
        .lastNameLabel {
          margin-top: 0px;
        }
        .outline_btn{
          background-color: white;
          border: 1px solid #BDC1C6;
          color: #838383;
          font-weight: 600;
          font-size: 13px;
          margin: 40px 0;
        }
        .upload-docs{
          margin: 40px 0;
        }
        .uploadContainer{
          display: flex;
        }

      </style>
      <wbi-api id='api'></wbi-api>
      <div>
        <label for='Country'>Select Country</label>
        <select value='{{country::input}}' on-change="_country" class="country">
          <option value='' id=''>Select...</option>
          <template is='dom-repeat' items='[[countrydocs]]'>
            <option value='{{item.code}}' id='{{item.code}}'>{{item.name}}</option>
          </template>
        </select> 
        <template is="dom-if" if="{{radioArray}}">       
        <hr/>

        <label for='firstName'>First Name</label>
        <input type='text' name='firstName' id='firstName' value='{{firstName::input}}' on-keyup="_firstName"><br>

        <label for='middleName'>Middle Name</label>
        <input type='text' name='middleName' id='middleName' value='{{middleName::input}}' on-keyup="_middleName"><br>
        <small>Optional</small>

        <label for='lastName' class="lastNameLabel">Last Name</label>
        <input type='text' name='lastName' id='lastName' value='{{lastName::input}}' on-keyup="_lastName"><br>

        <label for='dob'>Date of birth</label>
        <select name='day' id='day' value='{{day::input}}' on-change="_day">
          <option value='Day'>Day</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
          <option value='16'>16</option>
          <option value='17'>17</option>
          <option value='18'>18</option>
          <option value='19'>19</option>
          <option value='20'>20</option>
          <option value='21'>21</option>
          <option value='22'>22</option>
          <option value='23'>23</option>
          <option value='24'>24</option>
          <option value='25'>25</option>
          <option value='26'>26</option>
          <option value='27'>27</option>
          <option value='28'>28</option>
          <option value='29'>29</option>
          <option value='30'>30</option>
          <option value='31'>31</option>
        </select>
        <select name='month' id='month' value='{{month::input}}' on-change="_month">
          <option value='Month'>Month</option>
          <option value='1'>January</option>
          <option value='2'>Febuary</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>November</option>
          <option value='12'>Decemeber</option>
        </select>
        <select name='year' id='year' value='{{year::input}}' on-change="_year">
          <option value='Year'>Year</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
          <option value="2010">2010</option>
          <option value="2009">2009</option>
          <option value="2008">2008</option>
          <option value="2007">2007</option>
          <option value="2006">2006</option>
          <option value="2005">2005</option>
          <option value="2004">2004</option>
          <option value="2003">2003</option>
          <option value="2002">2002</option>
          <option value="2001">2001</option>
          <option value="2000">2000</option>
          <option value="1999">1999</option>
          <option value="1998">1998</option>
          <option value="1997">1997</option>
          <option value="1996">1996</option>
          <option value="1995">1995</option>
          <option value="1994">1994</option>
          <option value="1993">1993</option>
          <option value="1992">1992</option>
          <option value="1991">1991</option>
          <option value="1990">1990</option>
          <option value="1989">1989</option>
          <option value="1988">1988</option>
          <option value="1987">1987</option>
          <option value="1986">1986</option>
          <option value="1985">1985</option>
          <option value="1984">1984</option>
          <option value="1983">1983</option>
          <option value="1982">1982</option>
          <option value="1981">1981</option>
          <option value="1980">1980</option>
          <option value="1979">1979</option>
          <option value="1978">1978</option>
          <option value="1977">1977</option>
          <option value="1976">1976</option>
          <option value="1975">1975</option>
          <option value="1974">1974</option>
          <option value="1973">1973</option>
          <option value="1972">1972</option>
          <option value="1971">1971</option>
          <option value="1970">1970</option>
          <option value="1969">1969</option>
          <option value="1968">1968</option>
          <option value="1967">1967</option>
          <option value="1966">1966</option>
          <option value="1965">1965</option>
          <option value="1964">1964</option>
          <option value="1963">1963</option>
          <option value="1962">1962</option>
          <option value="1961">1961</option>
          <option value="1960">1960</option>
          <option value="1959">1959</option>
          <option value="1958">1958</option>
          <option value="1957">1957</option>
          <option value="1956">1956</option>
          <option value="1955">1955</option>
          <option value="1954">1954</option>
          <option value="1953">1953</option>
          <option value="1952">1952</option>
          <option value="1951">1951</option>
          <option value="1950">1950</option>
          <option value="1949">1949</option>
          <option value="1948">1948</option>
          <option value="1947">1947</option>
          <option value="1946">1946</option>
          <option value="1945">1945</option>
          <option value="1944">1944</option>
          <option value="1943">1943</option>
          <option value="1942">1942</option>
          <option value="1941">1941</option>
          <option value="1940">1940</option>
          <option value="1939">1939</option>
          <option value="1938">1938</option>
          <option value="1937">1937</option>
          <option value="1936">1936</option>
          <option value="1935">1935</option>
          <option value="1934">1934</option>
          <option value="1933">1933</option>
          <option value="1932">1932</option>
          <option value="1931">1931</option>
          <option value="1930">1930</option>
        </select><br>


        <label for='gender'>Gender</label>
        <select name='gender' id='gender' value='{{gender::input}}' on-change="_gender">
        <option value=''>Select...</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <hr/>

      
          <h1 class="upload-docs">Upload documents</h1>
          <p>Select the type of Identity document you wish to upload</p>
            <p class='radio_group'>            
            <template is='dom-repeat' items='[[radioArray]]'>         
              <input type='radio' name='document' id='[[item.value]]' on-click='_makeFileUpload'/>
              <label for='sizeSmall' class="bullets">[[item.label]]</label>
            </template>
              {{radio}}
            </p> 
            
          <template is="dom-if" if="{{fileArray}}">
            <div class="uploadContainer">
              <template is='dom-repeat' items='[[fileArray]]'>
                <wbi-uploader file-name="[[item.value]]" label="[[item.label]]" country="[[country]]" completed="{{completed}}"></wbi-uploader>
              </template>
            </div>

            <wbi-uploader file-name="selfie" label="selfie" country="[[country]]" completed="{{completed}}"></wbi-uploader>
            <button on-click="_modalMobile" class="outline_btn">Take Pictures using your mobile device</button>
          </template>
          <button type='submit' name='submit' value='Submit' on-click="_submit" class="green-bg"/>Submit</button>
        </template>
        
      </div>
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
      color: {
        type: Object,
        readOnly: true,
      },
      env: {
        type: Object,
        readOnly: true,
      },
      countrydocs: {
        type: Array,
      },
      selectDocs: {
        type: Object,
        value: '',
      },
      selectedDoc: {
        type: Object,
      },
      radioArray: {
        type: Array,
      },
      fileArray: {
        type: Array,
      },
      env: {
        type: Object,
      },
    };
  }

  static mapStateToProps(state, element) {
    return {
      language: state.language,
      mode: state.mode,
      color: state.color,
      env: state.env,
    };
  }
  _gender(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this._submit();
    }
  }
  _year(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#gender').focus();
    }
  }
  _month(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#year').focus();
    }
  }
  _day(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#month').focus();
    }
  }
  _lastName(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#day').focus();
    }
  }
  _middleName(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#middleName').focus();
    }
  }
  _firstName(e) {
    this._isComplete();
    if (e.keyCode === 13) {
      this.shadowRoot.querySelector('#middleName').focus();
    }
  }
  _country(e) {
    this._isComplete();
    this._makeRadioButtons();
    setTimeout(() => {
      this.shadowRoot.querySelector('#lastName').focus();
    }, 0);
  }
  _isComplete() {
    if (this.country && this.firstName && this.lastName && this.day && this.month && this.year && this.gender) {
      this.updateStyles({'--active-color': '#92CC7F'});
      this.updateStyles({'--cursor-type': 'pointer'});
      this.updateStyles({'--pointer-event': 'auto'});
    } else {
      this.updateStyles({'--active-color': '#BDC1C6'});
      this.updateStyles({'--cursor-type': 'default'});
      this.updateStyles({'--pointer-event': 'none'});
    }
  }
  _modalMobile() {
    this.dispatchEvent(new CustomEvent('modal', {bubbles: true, composed: true, detail: {action: 'mobile', language: this.language}}));
  }
  _modalDocument() {
    this.dispatchEvent(new CustomEvent('modal', {bubbles: true, composed: true, detail: {action: 'document', language: this.language}}));
  }
  _modalSelfie() {
    this.dispatchEvent(new CustomEvent('modal', {bubbles: true, composed: true, detail: {action: 'selfie', language: this.language}}));
  }
  _submit() {
    if (this.country && this.firstName && this.lastName && this.day && this.month && this.year && this.gender) {
      this.$.api.application(this.country && this.firstName && this.lastName && this.day && this.month && this.year && this.gender)
          .then((response) => {
            console.log(response);
          });
    }
  }
  _makeFileUpload(e) {
    this.fileArray = [];
    this.selectedDoc = e.model.__data.item.value;
    const needReverse = this.countrydocs.find((x) => x.code === this.country).accepted[0][this.selectedDoc];
    needReverse ? this.fileArray.push({value: `${this.selectedDoc}_reverse`, label: `${this.selectedDoc.replace(/[_-]/g, ' ')} reverse`}, {value: `${this.selectedDoc}`, label: `${this.selectedDoc.replace(/[_-]/g, ' ')}`})
    : this.fileArray.push({value: `${this.selectedDoc}`, label: `${this.selectedDoc.replace(/[_-]/g, ' ')}`});
  }
  _makeRadioButtons() {
    const docsAvailable = this.countrydocs.find((x) => x.code === this.country).accepted[0];
    this.radioArray = [];
    for (let i = 0; i < Object.keys(docsAvailable).length; i++) {
      this.radioArray.push({
        label: Object.keys(docsAvailable).map((data) => data.replace(/[_-]/g, ' '))[i],
        value: Object.keys(docsAvailable)[i],
      });
    }
  }

  ready() {
    super.ready();
    this.countrydocs = [
      {'code': 'AFG', 'name': 'Afghanistan', 'accepted': [{'passport': false}]},
      {'code': 'AGO', 'name': 'Angola', 'accepted': [{'passport': false}]},
      {'code': 'ALB', 'name': 'Albania', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'AND', 'name': 'Andorra', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'ARE', 'name': 'United Arab Emirates', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'ARG', 'name': 'Argentina', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'ARM', 'name': 'Armenia', 'accepted': [{'passport': false}]},
      {'code': 'ATG', 'name': 'Antarctica', 'accepted': [{'passport': false}]},
      {'code': 'AUS', 'name': 'Australia', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'AUT', 'name': 'Austria', 'accepted': [{'national_identity_card': true}]},
      {'code': 'AZE', 'name': 'Azerbaijan', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'BDI', 'name': 'Burundi', 'accepted': [{'passport': false}]},
      {'code': 'BEL', 'name': 'Belgium', 'accepted': [{'national_identity_card': true}]},
      {'code': 'BEN', 'name': 'Benin', 'accepted': [{'passport': false}]},
      {'code': 'BFA', 'name': 'Burkina Faso', 'accepted': [{'passport': false}]},
      {'code': 'BGD', 'name': 'Bangladesh', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'BGR', 'name': 'Bulgaria', 'accepted': [{'national_identity_card': true}]},
      {'code': 'BHR', 'name': 'Bahrain', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'BHS', 'name': 'Bahamas', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'BIH', 'name': 'Bosnia and Herzegovina', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'BLR', 'name': 'Belarus', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'BLZ', 'name': 'Belize', 'accepted': [{'passport': false}]},
      {'code': 'BMU', 'name': 'Bermuda', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'BOL', 'name': 'Bolivia, Plurinational State of', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'BRA', 'name': 'Brazil', 'accepted': [{'national_identity_card': true}]},
      {'code': 'BRB', 'name': 'Barbados', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'BRN', 'name': 'Brunei Darussalam', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'BTN', 'name': 'Bhutan', 'accepted': [{'passport': false}]},
      {'code': 'BWA', 'name': 'Botswana', 'accepted': [{'passport': false}]},
      {'code': 'CAF', 'name': 'Central African Republic', 'accepted': [{'passport': false}]},
      {'code': 'CAN', 'name': 'Canada', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'CHE', 'name': 'Switzerland', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'CHL', 'name': 'Chile', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'CHN', 'name': 'China', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'CIV', 'name': 'Côte d\'Ivoire', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'CMR', 'name': 'Cameroon', 'accepted': [{'passport': false}]},
      {'code': 'COD', 'name': 'Congo, the Democratic Republic of the', 'accepted': [{'passport': false}]},
      {'code': 'COG', 'name': 'Congo', 'accepted': [{'passport': false}]},
      {'code': 'COL', 'name': 'Colombia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'COM', 'name': 'Comoros', 'accepted': [{'passport': false}]},
      {'code': 'CPV', 'name': 'Cape Verde', 'accepted': [{'passport': false}]},
      {'code': 'CRI', 'name': 'Costa Rica', 'accepted': [{'passport': false, 'driving_license': true, 'national_identity_card': true}]},
      {'code': 'CUB', 'name': 'Cuba', 'accepted': [{'passport': false}]},
      {'code': 'CYM', 'name': 'Cayman Islands', 'accepted': [{'passport': false}]},
      {'code': 'CYP', 'name': 'Cyprus', 'accepted': [{'national_identity_card': true}]},
      {'code': 'CZE', 'name': 'Czech Republic', 'accepted': [{'national_identity_card': true}]},
      {'code': 'DEU', 'name': 'Germany', 'accepted': [{'national_identity_card': true}]},
      {'code': 'DJI', 'name': 'Djibouti', 'accepted': [{'passport': false}]},
      {'code': 'DMA', 'name': 'Dominica', 'accepted': [{'passport': false}]},
      {'code': 'DNK', 'name': 'Denmark', 'accepted': [{'passport': false, 'driving_license': false, 'residency_permit': true}]},
      {'code': 'DOM', 'name': 'Dominican Republic', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'DZA', 'name': 'Algeria', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'ECU', 'name': 'Ecuador', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'EGY', 'name': 'Egypt', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'ERI', 'name': 'Eritrea', 'accepted': [{'passport': false}]},
      {'code': 'ESP', 'name': 'Spain', 'accepted': [{'national_identity_card': true}]},
      {'code': 'EST', 'name': 'Estonia', 'accepted': [{'national_identity_card': true}]},
      {'code': 'ETH', 'name': 'Ethiopia', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'FIN', 'name': 'Finland', 'accepted': [{'national_identity_card': true}]},
      {'code': 'FJI', 'name': 'Fiji', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'FRA', 'name': 'France', 'accepted': [{'national_identity_card': true}]},
      {'code': 'FRO', 'name': 'Faroe Islands', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'FSM', 'name': 'Micronesia, Federated States of', 'accepted': [{'passport': false}]},
      {'code': 'GAB', 'name': 'Gabon', 'accepted': [{'passport': false}]},
      {'code': 'GBR', 'name': 'United Kingdom', 'accepted': [{'passport': false, 'driving_license': false, 'residency_permit': false, 'naturalisation_certificate': false, 'home_office_letter': false, 'immigration_status_document': false, 'birth_certificate': false}]},
      {'code': 'GEO', 'name': 'Georgia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'GGY', 'name': 'Guernsey', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'GHA', 'name': 'Ghana', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'GIB', 'name': 'Gibraltar', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'GIN', 'name': 'Guinea', 'accepted': [{'passport': false}]},
      {'code': 'GMB', 'name': 'Gambia', 'accepted': [{'passport': false}]},
      {'code': 'GNB', 'name': 'Guinea-Bissau', 'accepted': [{'passport': false}]},
      {'code': 'GNQ', 'name': 'Equatorial Guinea', 'accepted': [{'passport': false}]},
      {'code': 'GRC', 'name': 'Greece', 'accepted': [{'national_identity_card': true}]},
      {'code': 'GRD', 'name': 'Grenada', 'accepted': [{'passport': false}]},
      {'code': 'GTM', 'name': 'Guatemala', 'accepted': [{'passport': false, 'driving_license': true, 'national_identity_card': true}]},
      {'code': 'GUY', 'name': 'Guyana', 'accepted': [{'passport': false}]},
      {'code': 'HKG', 'name': 'Hong Kong', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'HND', 'name': 'Honduras', 'accepted': [{'passport': false}]},
      {'code': 'HRV', 'name': 'Croatia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'HTI', 'name': 'Haiti', 'accepted': [{'passport': false}]},
      {'code': 'HUN', 'name': 'Hungary', 'accepted': [{'national_identity_card': true}]},
      {'code': 'IDN', 'name': 'Indonesia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'IMN', 'name': 'Isle of Man', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'IND', 'name': 'India', 'accepted': [{'national_identity_card': true}]},
      {'code': 'IRL', 'name': 'Ireland', 'accepted': [{'passport': false, 'passport_card': true, 'driving_license': false, 'residency_permit': true}]},
      {'code': 'IRN', 'name': 'Iran, Islamic Republic of', 'accepted': [{'passport': false}]},
      {'code': 'IRQ', 'name': 'Iraq', 'accepted': [{'passport': false}]},
      {'code': 'ISL', 'name': 'Iceland', 'accepted': [{'national_identity_card': true}]},
      {'code': 'ISR', 'name': 'Israel', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'ITA', 'name': 'Italy', 'accepted': [{'national_identity_card': true}]},
      {'code': 'JAM', 'name': 'Jamaica', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'JEY', 'name': 'Jersey', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'JOR', 'name': 'Jordan', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'JPN', 'name': 'Japan', 'accepted': [{'passport': false, 'driving_license': false, 'residency_permit': false}]},
      {'code': 'KAZ', 'name': 'Kazakhstan', 'accepted': [{'passport': false}]},
      {'code': 'KEN', 'name': 'Kenya', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'KGZ', 'name': 'Kyrgyzstan', 'accepted': [{'passport': false}]},
      {'code': 'KHM', 'name': 'Cambodia', 'accepted': [{'passport': false}]},
      {'code': 'KIR', 'name': 'Kiribati', 'accepted': [{'passport': false}]},
      {'code': 'KNA', 'name': 'Saint Kitts and Nevis', 'accepted': [{'passport': false}]},
      {'code': 'KOR', 'name': 'Korea, Republic of', 'accepted': [{'passport': false}]},
      {'code': 'KWT', 'name': 'Kuwait', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'LAO', 'name': 'Lao People\'s Democratic Republic', 'accepted': [{'passport': false}]},
      {'code': 'LBN', 'name': 'Lebanon', 'accepted': [{'passport': false}]},
      {'code': 'LBR', 'name': 'Liberia', 'accepted': [{'passport': false}]},
      {'code': 'LBY', 'name': 'Libya', 'accepted': [{'passport': false}]},
      {'code': 'LCA', 'name': 'Saint Lucia', 'accepted': [{'passport': false}]},
      {'code': 'LIE', 'name': 'Liechtenstein', 'accepted': [{'national_identity_card': true}]},
      {'code': 'LKA', 'name': 'Sri Lanka', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'LSO', 'name': 'Lesotho', 'accepted': [{'passport': false}]},
      {'code': 'LTU', 'name': 'Lithuania', 'accepted': [{'national_identity_card': true}]},
      {'code': 'LUX', 'name': 'Luxembourg', 'accepted': [{'national_identity_card': true}]},
      {'code': 'LVA', 'name': 'Latvia', 'accepted': [{'national_identity_card': true}]},
      {'code': 'MAC', 'name': 'Macao', 'accepted': [{'residency_permit': false}]},
      {'code': 'MAF', 'name': 'Saint Martin (French part)', 'accepted': [{'driving_license': false}]},
      {'code': 'MAR', 'name': 'Morocco', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'MCO', 'name': 'Monaco', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'MDA', 'name': 'Moldova, Republic of', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'MDG', 'name': 'Madagascar', 'accepted': [{'passport': false}]},
      {'code': 'MDV', 'name': 'Maldives', 'accepted': [{'passport': false}]},
      {'code': 'MEX', 'name': 'Mexico', 'accepted': [{'passport': false, 'driving_license': false, 'voter_id': false, 'work_permit': false}]},
      {'code': 'MHL', 'name': 'Marshall Islands', 'accepted': [{'passport': false}]},
      {'code': 'MKD', 'name': 'Macedonia, the former Yugoslav Republic of', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'MLI', 'name': 'Mali', 'accepted': [{'passport': false}]},
      {'code': 'MLT', 'name': 'Malta', 'accepted': [{'national_identity_card': true}]},
      {'code': 'MMR', 'name': 'Myanmar', 'accepted': [{'passport': false}]},
      {'code': 'MNE', 'name': 'Montenegro', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'MNG', 'name': 'Mongolia', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'MOZ', 'name': 'Mozambique', 'accepted': [{'passport': false}]},
      {'code': 'MRT', 'name': 'Mauritania', 'accepted': [{'passport': false}]},
      {'code': 'MSR', 'name': 'Montserrat', 'accepted': [{'passport': false}]},
      {'code': 'MUS', 'name': 'Mauritius', 'accepted': [{'passport': false}]},
      {'code': 'MWI', 'name': 'Malawi', 'accepted': [{'passport': false}]},
      {'code': 'MYS', 'name': 'Malaysia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'NAM', 'name': 'Namibia', 'accepted': [{'passport': false}]},
      {'code': 'NER', 'name': 'Niger', 'accepted': [{'passport': false}]},
      {'code': 'NGA', 'name': 'Nigeria', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'NIC', 'name': 'Nicaragua', 'accepted': [{'passport': false}]},
      {'code': 'NLD', 'name': 'Netherlands', 'accepted': [{'national_identity_card': true}]},
      {'code': 'NOR', 'name': 'Norway', 'accepted': [{'passport': false, 'driving_license': false, 'residency_permit': true}]},
      {'code': 'NPL', 'name': 'Nepal', 'accepted': [{'passport': false}]},
      {'code': 'NRU', 'name': 'Nauru', 'accepted': [{'passport': false}]},
      {'code': 'NZL', 'name': 'New Zealand', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'OMN', 'name': 'Oman', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'PAK', 'name': 'Pakistan', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'PAN', 'name': 'Panama', 'accepted': [{'passport': false}]},
      {'code': 'PER', 'name': 'Peru', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'PHL', 'name': 'Philippines', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'PLW', 'name': 'Palau', 'accepted': [{'passport': false}]},
      {'code': 'PNG', 'name': 'Papua New Guinea', 'accepted': [{'passport': false}]},
      {'code': 'POL', 'name': 'Poland', 'accepted': [{'national_identity_card': true}]},
      {'code': 'PRI', 'name': 'Puerto Rico', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'PRK', 'name': 'Korea, Democratic People\'s Republic of', 'accepted': [{'passport': false}]},
      {'code': 'PRT', 'name': 'Portugal', 'accepted': [{'national_identity_card': true}]},
      {'code': 'PRY', 'name': 'Paraguay', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'PSE', 'name': 'Palestinian Territory, Occupied', 'accepted': [{'passport': false}]},
      {'code': 'QAT', 'name': 'Qatar', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'ROU', 'name': 'Romania', 'accepted': [{'national_identity_card': true}]},
      {'code': 'RUS', 'name': 'Russian Federation', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'RWA', 'name': 'Rwanda', 'accepted': [{'passport': false}]},
      {'code': 'SAU', 'name': 'Saudi Arabia', 'accepted': [{'passport': false, 'driving_license': false, 'residency_permit': false}]},
      {'code': 'SDN', 'name': 'Sudan', 'accepted': [{'passport': false}]},
      {'code': 'SEN', 'name': 'Senegal', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'SGP', 'name': 'Singapore', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'SLB', 'name': 'Solomon Islands', 'accepted': [{'passport': false}]},
      {'code': 'SLE', 'name': 'Sierra Leone', 'accepted': [{'passport': false}]},
      {'code': 'SLV', 'name': 'El Salvador', 'accepted': [{'passport': false}]},
      {'code': 'SMR', 'name': 'San Marino', 'accepted': [{'passport': false}]},
      {'code': 'SOM', 'name': 'Somalia', 'accepted': [{'passport': false}]},
      {'code': 'SRB', 'name': 'Serbia', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'SSD', 'name': 'South Sudan', 'accepted': [{'passport': false}]},
      {'code': 'STP', 'name': 'Sao Tome and Principe', 'accepted': [{'passport': false}]},
      {'code': 'SUR', 'name': 'Suriname', 'accepted': [{'passport': false}]},
      {'code': 'SVK', 'name': 'Slovakia', 'driving_license': false, 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'SVN', 'name': 'Slovenia', 'accepted': [{'national_identity_card': true}]},
      {'code': 'SWE', 'name': 'Sweden', 'accepted': [{'national_identity_card': true}]},
      {'code': 'SWZ', 'name': 'Swaziland', 'accepted': [{'passport': false}]},
      {'code': 'SYC', 'name': 'Seychelles', 'accepted': [{'passport': false}]},
      {'code': 'SYR', 'name': 'Syrian Arab Republic', 'accepted': [{'passport': false}]},
      {'code': 'TCA', 'name': 'Turks and Caicos Islands', 'accepted': [{'passport': false}]},
      {'code': 'TCD', 'name': 'Chad', 'accepted': [{'passport': false}]},
      {'code': 'TGO', 'name': 'Togo', 'accepted': [{'passport': false}]},
      {'code': 'THA', 'name': 'Thailand', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'TJK', 'name': 'Tajikistan', 'accepted': [{'passport': false}]},
      {'code': 'TKM', 'name': 'Turkmenistan', 'accepted': [{'passport': false}]},
      {'code': 'TLS', 'name': 'Timor-Leste', 'accepted': [{'passport': false}]},
      {'code': 'TON', 'name': 'Tonga', 'accepted': [{'passport': false}]},
      {'code': 'TTO', 'name': 'Trinidad and Tobago', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'TUN', 'name': 'Tunisia', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'TUR', 'name': 'Turkey', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'TUV', 'name': 'Tuvalu', 'accepted': [{'passport': false}]},
      {'code': 'TWN', 'name': 'Taiwan, Province of China', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'TZA', 'name': 'Tanzania, United Republic of', 'accepted': [{'passport': false, 'driving_license': false, 'voter_id': false}]},
      {'code': 'UGA', 'name': 'Uganda', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'UKR', 'name': 'Ukraine', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'URY', 'name': 'Uruguay', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'USA', 'name': 'United States', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'UZB', 'name': 'Uzbekistan', 'accepted': [{'passport': false}]},
      {'code': 'VEN', 'name': 'Venezuela, Bolivarian Republic of', 'accepted': [{'passport': false, 'national_identity_card': true}]},
      {'code': 'VNM', 'name': 'Viet Nam', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'VUT', 'name': 'Vanuatu', 'accepted': [{'passport': false}]},
      {'code': 'WSM', 'name': 'Samoa', 'accepted': [{'passport': false}]},
      {'code': 'YEM', 'name': 'Yemen', 'accepted': [{'passport': false, 'driving_license': false}]},
      {'code': 'ZAF', 'name': 'South Africa', 'accepted': [{'passport': false, 'driving_license': false, 'national_identity_card': true}]},
      {'code': 'ZMB', 'name': 'Zambia', 'accepted': [{'passport': false}]},
      {'code': 'ZWE', 'name': 'Zimbabwe', 'accepted': [{'passport': false}]},
    ];

    this.countrydocs.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }
} window.customElements.define('wbi-application', WbiApplication);
