import { useWindowDimensions } from 'react-native';

export const COLOR = {
  creamWhite: '#FAF6F0', // Main dashboard background sheet
  sageMintGreen: '#CBE3DB', // Left sidebar navigation panel
  mutedCoralPink: '#F5D6C6', // Outer frame and main background border
  darkCharcoalBrown: '#4E3629', // Heading titles, menu names, and main typography text
  vibrantCoralOrange: '#E78367', // Primary action buttons, play trigger, and badge markers
  softOrangePeach: '#FAD6C3', // Main welcome user banner card background
  paleSoftMint: '#DDF0E8', // Songs played stat card background
  blushPink: '#FADAD1', // Favorites count stat card background
  pastelYellow: '#FDF0CD', // Hours listened metric card background
  softLightBlue: '#DDF2F4', // Current streak count card background
};

export const COLORSS = {
  // Brand Colors
  primary: '#0284C7',
  secondary: '#0F172A',
  accent: '#F59E0B',

  // Neutral Palette
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Grays (Shades)
  gray50: '#F8FAFC',
  gray100: '#F1F5F9',
  gray400: '#94A3B8',
  gray900: '#0F172A',

  // Status/Feedback
  success: '#22C55E',
  warning: '#EAB308',
  error: '#EF4444',
  info: '#3B82F6',
};
export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',

  background: '#FFFFFF',
  surface: '#F8FAFC',
  surfaceSecondary: '#F1F5F9',

  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',

  border: '#E5E7EB',
  divider: '#E5E7EB',

  success: '#16A34A',
  successLight: '#DCFCE7',

  warning: '#F59E0B',
  warningLight: '#FEF3C7',

  error: '#DC2626',
  errorLight: '#FEE2E2',

  info: '#0284C7',
  infoLight: '#E0F2FE',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};
export const FONT_FAMILY = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
};
export const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};
export const LINE_HEIGHT = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
  display: 40,
};
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  massive: 64,
};
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
  circle: 999,
};
export const BUTTON = {
  small: {
    height: 40,
    paddingHorizontal: 12,
    radius: 8,
  },

  medium: {
    height: 48,
    paddingHorizontal: 16,
    radius: 12,
  },

  large: {
    height: 52,
    paddingHorizontal: 20,
    radius: 12,
  },
};
export const INPUT = {
  height: 48,
  paddingHorizontal: 16,
  radius: 12,
  borderWidth: 1,
};
export const ICON_SIZE = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
};
export const SCREEN = {
  horizontalPadding: 16,
  verticalPadding: 16,
};
export const CARD = {
  padding: 12,
  radius: 16,
  gap: 12,
};
export const AVATAR = {
  small: 32,
  medium: 40,
  large: 56,
  xlarge: 72,
};
export const OPACITY = {
  disabled: 0.5,
  muted: 0.7,
  overlay: 0.5,
};
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
};
export const BACKGROUND_COLORS = {
  // Main
  primary: '#FFFFFF',
  secondary: '#F8FAFC',

  // Surface
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  surfaceTertiary: '#E2E8F0',

  // Brand
  brand: '#2563EB',
  brandLight: '#EFF6FF',

  // Status
  success: '#F0FDF4',
  warning: '#FFFBEB',
  error: '#FEF2F2',
  info: '#F0F9FF',

  // Dark
  dark: '#111827',
  darkSecondary: '#1F2937',

  // Disabled
  disabled: '#F3F4F6',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Transparent
  transparent: 'transparent',
};
export const BACKGROUND = {
  default: '#FFFFFF',
  muted: '#F8FAFC',
  subtle: '#F1F5F9',

  primary: '#2563EB',
  primaryLight: '#EFF6FF',

  success: '#F0FDF4',
  warning: '#FFFBEB',
  error: '#FEF2F2',
  info: '#F0F9FF',

  disabled: '#F3F4F6',

  dark: '#111827',
  darkSecondary: '#1F2937',

  overlay: 'rgba(0, 0, 0, 0.5)',
  transparent: 'transparent',
};
export const WIDTH = {
  // Screen
  screen: '100%',

  // Content
  full: '100%',
  half: '50%',

  // Common component widths
  buttonFull: '100%',
  inputFull: '100%',

  // Mobile
  mobile: 390,

  // Tablet
  tablet: 768,

  // Desktop
  desktop: 1440,

  // Content max widths
  contentSmall: 640,
  contentMedium: 768,
  contentLarge: 1200,
};
export const useHomeCardWidth = ({ visible }) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTab = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;

  let currentContentPixels = width;

  if (visible && !isMobile) {
    currentContentPixels = isDesktop ? width * 0.8 : width * 0.7;
  }

  // 2. డివైజ్ ని బట్టి సైడ్ బార్ వెడల్పును డైనమిక్‌గా మారుస్తున్నాం
  let sidebarWidth = '0%';
  if (visible) {
    if (isDesktop) sidebarWidth = '20%'; // డెస్క్‌టాప్‌లో 20% స్థలం
    else if (isTab) sidebarWidth = '30%'; // టాబ్లెట్‌లో 30% స్థలం
    else sidebarWidth = '25%'; // మొబైల్‌లో 75% స్థలం (ఓవర్‌లే అవుతుంది)
  }

  // స్క్రీన్ సైజ్ ని బట్టి కార్డ్ విడ్త్ సెట్ చేస్తున్నాం
  let cardWidth = '100%';
  if (isDesktop) cardWidth = '31%'; // డెస్క్‌టాప్‌లో పక్కపక్కన 3 కార్డ్స్
  else if (isTab) cardWidth = '48%'; // టాబ్లెట్‌లో పక్కపక్కన 2 కార్డ్స్

  const paddingOffset = 40;

  let chartWidthPixels = currentContentPixels - paddingOffset; // default mobile pixels

  if (currentContentPixels <= 767) {
    cardWidth = '100%';
    chartWidthPixels = currentContentPixels - paddingOffset;
  } else if (currentContentPixels >= 768 && currentContentPixels <= 1024) {
    cardWidth = '48%';
    // టాబ్లెట్ లో ఒక చార్ట్ కి సరిపోయే నంబర్ పిక్సెల్స్ (సగం స్పేస్)
    chartWidthPixels = currentContentPixels / 2 - paddingOffset;
  } else if (currentContentPixels > 1024 && currentContentPixels <= 1340) {
    cardWidth = '31%';
    // లాప్‌టాప్ లో చార్ట్ విడ్త్ పిక్సెల్స్
    chartWidthPixels = currentContentPixels / 3 - paddingOffset;
  } else if (currentContentPixels > 1340) {
    cardWidth = '23%';
    // లార్జ్ స్క్రీన్ లో చార్ట్ విڈత్ పిక్సెల్స్
    chartWidthPixels = currentContentPixels / 4 - paddingOffset;
  }

  return { cardWidth, sidebarWidth, chartWidthPixels };
};

export const useCardWidth = ({ visible }) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  //const isTab = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;

  let currentContentPixels = width;

  if (visible && !isMobile) {
    currentContentPixels = isDesktop ? width * 0.8 : width * 0.7;
  }

  let cardWidth = '100%'; // Default 1 item for Mobile

  if (currentContentPixels >= 768 && currentContentPixels <= 1024) {
    cardWidth = '48%'; // Above 768 -> 2 Items (Tablet)
  } else if (currentContentPixels > 1024 && currentContentPixels <= 1340) {
    cardWidth = '48%'; // Above 1024 -> 3 Items (Laptop)
  } else if (currentContentPixels > 1340) {
    cardWidth = '32%'; // Above 1440 -> 4 Items (Desktop Large Screen)
  }

  return cardWidth;
};

// Input Field width arjest
export const useInputCardWidth = ({ visible }) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  //const isTab = width >= 768 && width <= 1024;
  const isDesktop = width > 1024;

  let currentContentPixels = width;
  if (visible && !isMobile) {
    currentContentPixels = isDesktop ? width * 0.8 : width * 0.7;
  }

  let cardWidth = '100%'; // Below 768 -> 1 Item (Mobile)

  if (currentContentPixels >= 768 && currentContentPixels <= 1024) {
    cardWidth = '48%'; // Above 768 -> 2 Items (Tablet)
  } else if (currentContentPixels > 1024 && currentContentPixels <= 1340) {
    cardWidth = '31%'; // Above 1024 -> 3 Items (Laptop)
  } else if (currentContentPixels > 1340) {
    cardWidth = '23%'; // Above 1440 -> 4 Items (Desktop Large Screen)
  }
  return cardWidth;
};

// Helper for DD-MM-YYYY format
export const getTodayFormatted = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
};

export const useCartCardWidth = ({ visible }) => {
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isDesktop = width > 1024;

  let currentContentPixels = width;

  if (visible && !isMobile) {
    currentContentPixels = isDesktop ? width * 0.8 : width * 0.7;
  }

  // మార్జిన్లు మరియు ప్యాడింగ్ కోసం కొద్దిగా స్పేస్ (Offset) తీసివేయాలి
  const paddingOffset = 40;

  let cardWidth = '100%';
  let chartWidthPixels = currentContentPixels - paddingOffset; // default mobile pixels
  if (currentContentPixels <= 767) {
    cardWidth = '100%';
  } else if (currentContentPixels >= 768 && currentContentPixels <= 1024) {
    cardWidth = '48%';
    // టాబ్లెట్ లో ఒక చార్ట్ కి సరిపోయే నంబర్ పిక్సెల్స్ (సగం స్పేస్)
    chartWidthPixels = currentContentPixels / 2 - paddingOffset;
  } else if (currentContentPixels > 1024 && currentContentPixels <= 1340) {
    cardWidth = '31%';
    // లాప్‌టాప్ లో చార్ట్ విడ్త్ పిక్సెల్స్
    chartWidthPixels = currentContentPixels / 3 - paddingOffset;
  } else if (currentContentPixels > 1340) {
    cardWidth = '23%';
    // లార్జ్ స్క్రీన్ లో చార్ట్ విڈత్ పిక్సెల్స్
    chartWidthPixels = currentContentPixels / 4 - paddingOffset;
  }

  // 💡 ఇక్కడ స్ట్రింగ్ మరియు నంబర్ వాల్యూస్ రెండింటినీ ఆబ్జెక్ట్ రూపంలో పంపుతున్నాం
  return { cardWidth, chartWidthPixels };
};
