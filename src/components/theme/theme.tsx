import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import {
  createTheme,
  StyledEngineProvider,
  Theme,
} from '@material-ui/core/styles';
import React, { useState } from 'react';
import { components } from './components';
import { a11yPalette } from './palettes/a11y';
import { darkPalette } from './palettes/dark';
import { lightPalette } from './palettes/light';
import { shadows } from './shadows';
import { typography } from './typography';

const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  components,
  shadows,
});

const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  components,
  shadows,
});

const a11yTheme = createTheme({
  palette: a11yPalette,
  typography,
  components,
  shadows,
});

const themeMap: { [key: string]: Theme } = {
  light: lightTheme,
  dark: darkTheme,
  a11y: a11yTheme,
};

function getThemeByName(theme: string): Theme {
  return themeMap[theme];
}

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

export const ThemeProvider = (props: any) => {
  const [themeName, setThemeName] = useState('light');

  const theme = getThemeByName(themeName);

  return (
    <ThemeContext.Provider value={setThemeName}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {props.children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};
// #readmore https://techinscribed.com/building-react-app-using-material-ui-with-support-for-multiple-switchable-themes/
// #TODO handleTheme
// import React, { useContext } from 'react';
// import { Button } from '@material-ui/core';
// import { ThemeContext} from './ThemeProvider';

// const App: React.FC = () => {
//   // Get the setter function from context
//   const setThemeName = useContext(ThemeContext)

//   return (
//     <div className="App">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setThemeName("lightTheme")}
//         >
//           Set Light Theme
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setThemeName("darkTheme")}
//         >
//           Set Dark Theme
//         </Button>
//     </div>
//   );
// }
