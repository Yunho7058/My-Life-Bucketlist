//각각 모드 style 지정

const dark = {
  mainBackground: '#292B2E',
  primaryText: 'rgb(240,240,240)',
  // secondaryText: 'rgba(255,255,255,0.45)',
  // disable: 'rgba(255,255,255,0.25)',
  border: '#d1d5da',
  divider: 'rgba(255, 255, 255, 0.6)',
  // background: 'rgb(217, 223, 226)',
  // tableHeader: 'rgba(255,255,255,0.02)',
  themeIcon: '#FBE302',
  // point-color
  // blue1: '#f1f8ff',
  // blue2: '#c0d3eb',
  // blue3: '#00adb5',
  // green: '#1fab89',
  // gray: '#393e46',
  loginLine: '#fff',
  background1: 'rgba(20, 20, 20,0.7)',
  background2: 'rgb(43, 44, 49)',
  background3: 'rgba(0, 0, 0,0.6)',
  borderBox: 'rgba(20, 20, 20,0.7)',
  BGInput: 'rgb(43, 44, 40)',
  FCInput: 'hsl(230, 4%, 90%)',
  fontColor: '#DCDCDC',
  stepIconBackColor: 'white',
  stepIconColor: '#00fa9a',
};

const light = {
  mainBackground: '#fff',
  primaryText: '#292B2E',
  // secondaryText: 'rgba(0, 0, 0, 0.45)',
  // disable: 'rgba(0, 0, 0, 0.25)',
  border: '#d1d5da',
  divider: 'rgba(106, 115, 125, 0.3)',
  // background: 'rgb(217, 223, 226)',
  // tableHeader: 'rgba(0, 0, 0, 0.02)',
  themeIcon: '#1fab89',
  // blue1: '#f1f8ff',
  // blue2: '#c0d3eb',
  // blue3: '#00adb5',
  // green: '#1fab89',
  // gray: '#393e46',
  loginLine: 'rgb(0,0,0,0.35)',
  background1: '#E0E0E0',
  background2: '#FFFFFF',
  background3: '#FFFFFF',
  borderBox: '#d1d5da',

  BGInput: '#E0E0E0',
  FCInput: 'black',
  fontColor: 'black',
  stepIconBackColor: 'rgb(0,0,0,0.35)',
  stepIconColor: '',
};

//! 왜 폰트 사이즈마다 다를까?
const fontSizes = {
  xsm: '10px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '28px',
};

const fontWeights = {
  extraBold: 800,
  bold: 700,
  semiBold: 600,
  regular: 400,
};

export { dark, light, fontSizes, fontWeights };
