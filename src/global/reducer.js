const savedLanguage = localStorage.getItem('language') || 'English';
import {env} from '../../env.js';

const initial = {
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
    default:
      return state;
  }
};
