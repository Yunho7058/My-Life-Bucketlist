import { IS_DARK_MODE } from '../action';

const localThem = window.localStorage.getItem('theme');
let theme = localThem ? localThem : 'dark';

const isDarkeMode = (state = theme, action: { type: string }) => {
  switch (action.type) {
    case IS_DARK_MODE:
      let copy = localThem ? localThem : 'dark';
      if (state === 'light') {
        window.localStorage.setItem('theme', 'dark');
        copy = 'dark';
      } else {
        window.localStorage.setItem('theme', 'light');
        copy = 'light';
      }
      return copy;
    default:
      return state;
  }
};

export default isDarkeMode;
