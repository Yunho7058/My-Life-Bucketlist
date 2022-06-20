import 'styled-components';

//type 지정

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      [key: string]: string;
      // mainBackground: string;
      // primaryText: string;

      // border: string;
      // divider: string;

      // themeIcon: string;

      // loginLine: string;
      // background1: string;
      // background2: string;
      // background3: string;
      // background4: string;
      // borderBox: string;

      // BGInput: string;
      // FCInput: string;
      // fontColor: string;
      // stepIconBackColor: string;
      // stepIconColor: string;
    };
    // fontSizes: {
    //   xsm: string;
    //   sm: string;
    //   md: string;
    //   lg: string;
    //   xl: string;
    //   xxl: string;
    // };
    // fontWeights: {
    //   extraBold: number;
    //   bold: number;
    //   semiBold: number;
    //   regular: number;
    // };
  }
}
