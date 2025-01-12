import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { TypographyProps } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

declare module '@mui/material/styles' {
  interface TypeGradient {
    [key: string]: string;
  }

  interface Palette {
    gradient: TypeGradient;
  }
  interface PaletteOptions {
    gradient?: TypeGradient;
    dark?: TypeColor;
    light?: TypeColor;
    black?: TypeColor;
    white?: TypeColor;
    gray?: TypeColor;
    green?: TypeColor;
    red?: TypeColor;
    yellow?: TypeColor;
    blue?: TypeColor;
  }

  interface TypeColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    [key: string]: string | undefined;
  }

  interface TypographyVariants {
    h1: TypographyProps;
    h2: TypographyProps;
    h3: TypographyProps;
    h4: TypographyProps;
    h5: TypographyProps;
    h6: TypographyProps;

    body1: TypographyProps;
    body2: TypographyProps;
    body3: TypographyProps;
    body4: TypographyProps;

    caption: TypographyProps;

    overline: TypographyProps;
  }

  interface TypographyVariantsOptions {
    h1?: TypographyProps;
    h2?: TypographyProps;
    h3?: TypographyProps;
    h4?: TypographyProps;
    h5?: TypographyProps;
    h6?: TypographyProps;

    body1?: TypographyProps;
    body2?: TypographyProps;
    body3?: TypographyProps;
    body4?: TypographyProps;

    caption?: TypographyProps;

    overline?: TypographyProps;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;

    body1: true;
    body2: true;
    body3: true;
    body4: true;

    caption: true;

    overline: true;
  }
}
export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          50: '#F8FFF2',
          100: '#EAFFD7',
          200: '#DCFFBB',
          300: '#CEFF9C',
          400: '#C0FF7A',
          500: '#B9FF66',
          600: '#89BE4A',
          700: '#5B802F',
          800: '#314817',
          900: '#020300',
        },

        dark: {
          50: '#E5E5E6',
          100: '#B2B3B6',
          200: '#828389',
          300: '#55565E',
          400: '#2C2D36',
          500: '#191A23',
          600: '#14151D',
          700: '#0B0C11',
          800: '#040407',
          900: '#000000',
        },

        light: {
          50: '#FEFEFE',
          100: '#FCFCFC',
          200: '#FAFAFA',
          300: '#F8F8F8',
          400: '#F6F6F6',
          500: '#F5F5F5',
          600: '#DDDDDD',
          700: '#7B7B7B',
          800: '#2B2B2B',
          900: '#030303',
        },

        black: {
          50: '#E6E6E6',
          100: '#B0B0B0',
          200: '#8A8A8A',
          300: '#545454',
          400: '#333333',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },

        white: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FFFFFF',
          600: '#E8E8E8',
          700: '#B5B5B5',
          800: '#8C8C8C',
          900: '#6B6B6B',
        },

        gray: {
          50: '#F0F1F2',
          100: '#D2D3D7',
          200: '#BCBEC4',
          300: '#9DA0A9',
          400: '#8A8D99',
          500: '#6D717F',
          600: '#636774',
          700: '#4D505A',
          800: '#3C3E46',
          900: '#2E2F35',
        },

        green: {
          50: '#ECF8EF',
          100: '#C5E9CD',
          200: '#A9DEB4',
          300: '#81CF92',
          400: '#69C57D',
          500: '#43B75D',
          600: '#3DA755',
          700: '#308242',
          800: '#256533',
          900: '#1C4D27',
        },

        red: {
          50: '#FDECEC',
          100: '#FAC5C3',
          200: '#F7A9A7',
          300: '#F4827E',
          400: '#F16965',
          500: '#EE443F',
          600: '#D93E39',
          700: '#A9302D',
          800: '#832523',
          900: '#641D1A',
        },

        yellow: {
          50: '#FFF7E6',
          100: '#FFE5B0',
          200: '#FFD88A',
          300: '#FFC654',
          400: '#FFBB33',
          500: '#FFAA00',
          600: '#E89B00',
          700: '#B57900',
          800: '#8C5E00',
          900: '#6B4700',
        },

        blue: {
          50: '#E6F4FF',
          100: '#B0DEFF',
          200: '#8ACEFF',
          300: '#54B8FF',
          400: '#33AAFF',
          500: '#0095FF',
          600: '#0088E8',
          700: '#006AB5',
          800: '#00528C',
          900: '#003F6B',
        },

        gradient: {
          1: 'radial-gradient(12158.65% 140.68% at 99.42% 0%, #b9ff66 0%, #b9ff66 48.44%, #b9ff66 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #9cd94f 0%, #a7e356 48.44%, #a2e255 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #9cd94f 0%, #a7e356 48.44%, #a2e255 100%)',
          2: 'radial-gradient(1413.54% 103.95% at -3.95% 100%, #a7e356 0%, #a6e255 52.83%, #9cd94f 100%)',
          3: 'radial-gradient(12158.65% 140.68% at 99.42% 0%, #9cd94f 0%, #a7e356 48.44%, #a2e255 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #9cd94f 0%, #a7e356 48.44%, #a2e255 100%)',
        },
      },

      typography: {
        fontFamily: 'Space Grotesk, sans-serif',

        h1: {
          fontSize: '60px',
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontSize: '40px',
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
        },
        h3: {
          fontSize: '30px',
          fontWeight: 600,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        },
        h4: {
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '0em',
        },

        body1: {
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0em',
        },
        body2: {
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.01em',
        },
        body3: {
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        },
        body4: {
          fontSize: '10px',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.03em',
        },

        caption: {
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.03em',
        },

        overline: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        },
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: 'Space Grotesk, san serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#333',
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              lineHeight: '16px',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
      },
    }),
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
