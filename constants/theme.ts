export const COLORS = {
  // Primary colors
  primary: '#38bdf8',
  primaryLight: '#7dd3fc',
  primaryDark: '#0ea5e9',
  
  // Secondary colors
  secondary: '#fbbf24',
  secondaryLight: '#fcd34d',
  secondaryDark: '#f59e0b',
  
  // Success colors
  success: '#22c55e',
  successLight: '#4ade80',
  successDark: '#16a34a',
  
  // Warning colors
  warning: '#fbbf24',
  warningLight: '#fcd34d',
  warningDark: '#f59e0b',
  
  // Error colors
  error: '#ef4444',
  errorLight: '#f87171',
  errorDark: '#dc2626',
  
  // Neutral colors
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Text colors
  textPrimary: '#101519',
  textSecondary: '#5a748c',
  textMuted: '#9ca3af',
  
  // Background colors
  background: '#f8fafc',
  backgroundLight: '#ffffff',
  backgroundDark: '#f1f5f9',
  
  // Card colors
  cardBackground: '#ffffff',
  cardBorder: '#f3f4f6',
  
  // Special colors
  gold: '#FFD700',
  purple: '#8b5cf6',
  pink: '#ec4899',
  indigo: '#6366f1',
  teal: '#14b8a6',
  orange: '#f59e42',
} as const;

export const SPACING = {
  // Base spacing unit (4px)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const LAYOUT = {
  // Screen margins
  screenPadding: SPACING.md,
  // Component spacing
  componentGap: SPACING.md,
  // Section spacing
  sectionGap: SPACING.lg,
  // Safe area bottom (accounts for tab bar + device safe area)
  safeAreaBottom: SPACING.xxl,
  // Header height
  headerHeight: 56,
  // Tab bar height
  tabBarHeight: 70,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
} as const;

// Professional spacing utilities
export const getSpacing = (size: keyof typeof SPACING) => SPACING[size];
export const getScreenPadding = () => LAYOUT.screenPadding;
export const getSafeAreaBottom = () => LAYOUT.safeAreaBottom; 