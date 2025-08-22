import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

export type IconProps = SvgProps & { size?: number; color?: string };

export const OverviewIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Rounded bar chart */}
    <Rect x="3.5" y="10" width="3.5" height="10" rx="1.75" stroke={color} strokeWidth={2} />
    <Rect x="9.25" y="6.5" width="3.5" height="13.5" rx="1.75" stroke={color} strokeWidth={2} />
    <Rect x="15" y="3.5" width="3.5" height="16.5" rx="1.75" stroke={color} strokeWidth={2} />
    {/* Smile accent */}
    <Path d="M7.5 5.25c1 .9 2.5 1.4 4.5 1.4 2 0 3.5-.5 4.5-1.4" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

export default OverviewIcon;


