import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import tw from '@/lib/tailwind';

type IconRenderArgs = { active: boolean; color: string; size: number };

type TabItem = {
  key: string;
  label: string;
  icon?: React.ReactNode | ((args: IconRenderArgs) => React.ReactNode);
};

type Props = {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  radius?: number;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  labelColorActive?: string;
  labelColorInactive?: string;
};

export default function TopTabsNavBar({
  tabs,
  activeKey,
  onChange,
  style,
  activeColor = '#16a34a',
  inactiveColor = '#6b7280',
  backgroundColor = '#ffffff',
  borderColor = '#e5e7eb',
  borderWidth = 4,
  radius = 16,
  activeBackgroundColor = '#eff6ff',
  inactiveBackgroundColor = 'transparent',
  labelColorActive,
  labelColorInactive,
}: Props) {
  return (
    <View
      style={[
        tw`mb-6 p-1`,
        { backgroundColor, borderColor, borderWidth, borderRadius: radius, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
        style,
      ]}
    >
      <View style={tw`flex-row`}>
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          const iconColor = active ? activeColor : inactiveColor;
          const labelColor = active
            ? (labelColorActive ?? iconColor)
            : (labelColorInactive ?? iconColor);
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={[
                tw`flex-1 items-center justify-center mx-1 py-2`,
                { borderRadius: Math.max(12, radius - 4), backgroundColor: active ? activeBackgroundColor : inactiveBackgroundColor },
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              activeOpacity={0.9}
            >
              <View
                style={[
                  tw`w-10 h-10 rounded-full items-center justify-center mb-1`,
                  { backgroundColor: active ? '#ffffff' : '#f9fafb' },
                ]}
              >
                {typeof tab.icon === 'function'
                  ? tab.icon({ active, color: iconColor, size: 22 })
                  : tab.icon || null}
              </View>
              <Text style={tw.style('font-semibold text-sm', { color: labelColor })}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


