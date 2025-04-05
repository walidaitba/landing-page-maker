import { Theme } from './index';

export type ThemeStyles = {
  fonts: {
    heading: string;
    body: string;
  };
  colors: {
    primary: {
      50: string;
      100: string;
      500: string;
      600: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      300: string;
      500: string;
      600: string;
      700: string;
      900: string;
    };
  };
};

export const themeStyles: Record<string, ThemeStyles> = {
  'modern-business': {
    fonts: {
      heading: '"Inter", sans-serif',
      body: '"Open Sans", sans-serif',
    },
    colors: {
      primary: {
        50: '#EBF8FF',
        100: '#BEE3F8',
        500: '#3182CE',
        600: '#2B6CB0',
        900: '#1A365D',
      },
      secondary: {
        50: '#F7FAFC',
        100: '#EDF2F7',
        300: '#CBD5E0',
        500: '#718096',
        600: '#4A5568',
        700: '#2D3748',
        900: '#1A202C',
      },
    },
  },
  'elegant-product': {
    fonts: {
      heading: '"Playfair Display", serif',
      body: '"Lato", sans-serif',
    },
    colors: {
      primary: {
        50: '#FBF7F4',
        100: '#F5EBE4',
        500: '#B8860B',
        600: '#9B7100',
        900: '#6B4E00',
      },
      secondary: {
        50: '#FAF9F8',
        100: '#F4F2F1',
        300: '#D2C8C0',
        500: '#8C7355',
        600: '#6B563F',
        700: '#4A3B2A',
        900: '#291F15',
      },
    },
  },
  'creative-agency': {
    fonts: {
      heading: '"Poppins", sans-serif',
      body: '"Roboto", sans-serif',
    },
    colors: {
      primary: {
        50: '#FFF5F5',
        100: '#FED7D7',
        500: '#E53E3E',
        600: '#C53030',
        900: '#742A2A',
      },
      secondary: {
        50: '#F0FFF4',
        100: '#C6F6D5',
        300: '#9AE6B4',
        500: '#48BB78',
        600: '#38A169',
        700: '#2F855A',
        900: '#22543D',
      },
    },
  },
  'tech-startup': {
    fonts: {
      heading: '"Space Grotesk", sans-serif',
      body: '"DM Sans", sans-serif',
    },
    colors: {
      primary: {
        50: '#E6F6FF',
        100: '#BAE3FF',
        500: '#0066FF',
        600: '#0052CC',
        900: '#003380',
      },
      secondary: {
        50: '#F3E8FF',
        100: '#E9D5FF',
        300: '#C084FC',
        500: '#9333EA',
        600: '#7E22CE',
        700: '#6B21A8',
        900: '#4A1D96',
      },
    },
  },
  'eco-friendly': {
    fonts: {
      heading: '"Montserrat", sans-serif',
      body: '"Source Sans Pro", sans-serif',
    },
    colors: {
      primary: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        500: '#22C55E',
        600: '#16A34A',
        900: '#14532D',
      },
      secondary: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        300: '#FCD34D',
        500: '#D97706',
        600: '#B45309',
        700: '#92400E',
        900: '#78350F',
      },
    },
  },
  'luxury-boutique': {
    fonts: {
      heading: '"Cormorant Garamond", serif',
      body: '"Mulish", sans-serif',
    },
    colors: {
      primary: {
        50: '#FFFAF0',
        100: '#FEEBC8',
        500: '#D4AF37',
        600: '#B8860B',
        900: '#744210',
      },
      secondary: {
        50: '#FAF5FF',
        100: '#E9D8FD',
        300: '#805AD5',
        500: '#553C9A',
        600: '#44337A',
        700: '#322659',
        900: '#1A1A2E',
      },
    },
  }
};