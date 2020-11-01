// Place for declaration of libs without types.
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: {
        primary: string;
        secondary: string;
      };
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
