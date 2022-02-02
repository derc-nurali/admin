import '@material-ui/core/InputBase';
import '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
    body3: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
    button3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtitle3: React.CSSProperties;
    body3: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
    button3: React.CSSProperties;
  }
}
// #TOTO add customm variants types

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    body3: true;
    button1: true;
    button2: true;
    button3: true;
  }
}
