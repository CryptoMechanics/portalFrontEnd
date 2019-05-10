const savedLanguage = localStorage.getItem('language') || 'English';
const status = localStorage.getItem('status') || 'created';
const network = localStorage.getItem('network') || 'available';
import {env} from '../../env.js';

const initial = {
  network: network,
  status: status,
  language: savedLanguage,
  env: env,
  color: {
    black1: '#121212',
    white1: '#FFFFFF',
  },
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return Object.assign({}, state, {
        language: action.language,
      });
    case 'CHANGE_EMAIL':
      return Object.assign({}, state, {
        email: action.email,
      });
    case 'CHANGE_STATUS':
      return Object.assign({}, state, {
        status: action.status,
      });
    case 'CHANGE_NETWORK':
      return Object.assign({}, state, {
        network: action.network,
      });
    case 'CHANGE_IMAGESTATUS':
      return Object.assign({}, state, {
        imagestatus: action.imagestatus,
      });
    default:
      return state;
  }
};


