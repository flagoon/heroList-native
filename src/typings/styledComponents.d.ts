// Place for declaration of libs without types.
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      black: string;
      white: string;
      error: string;
      text: {
        primary: string;
        secondary: string;
      };
    };
    textSize: {
      small: string;
      normal: string;
      medium: string;
      big: string;
    };
  }
}
