import React from 'react';
import { View, ScrollView, ViewStyle, ScrollViewProps, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LAYOUT, SPACING } from '@/constants/theme';

interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  scrollViewProps?: Partial<ScrollViewProps>;
  backgroundColor?: string;
  statusBarStyle?: 'light' | 'dark';
  hideContentUnderNav?: boolean;
  headerHeight?: number;
}

export default function ScreenLayout({
  children,
  scrollable = true,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  scrollViewProps = {},
  backgroundColor = 'transparent',
  statusBarStyle = 'dark',
  hideContentUnderNav = true,
  headerHeight = LAYOUT.headerHeight,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  // Calculate proper bottom padding
  const bottomPadding = insets.bottom + LAYOUT.safeAreaBottom;

  // Calculate top padding to account for header
  const topPadding = hideContentUnderNav ? headerHeight + insets.top : insets.top;

  const defaultContentStyle: ViewStyle = {
    flexGrow: 1,
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingHorizontal: LAYOUT.screenPadding,
  };

  const mergedContentStyle = contentContainerStyle 
    ? { ...defaultContentStyle, ...contentContainerStyle }
    : defaultContentStyle;

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor }, style]}>
      <StatusBar 
        barStyle={statusBarStyle === 'light' ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      
      {!scrollable ? (
        <View style={mergedContentStyle}>
          {children}
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={mergedContentStyle}
          bounces={true}
          overScrollMode="always"
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      )}
    </SafeAreaView>
  );
} 