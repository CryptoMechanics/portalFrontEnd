const savedLanguage = localStorage.getItem('language') || 'English';
const savedMode = localStorage.getItem('mode') || 'light';
import {env} from '../../env.js';

const initial = {
  language: savedLanguage,
  mode: savedMode,
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
    case 'CHANGE_MODE':
      return Object.assign({}, state, {
        mode: action.mode,
      });
    default:
      return state;
  }
};
