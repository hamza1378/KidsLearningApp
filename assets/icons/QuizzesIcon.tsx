import React from 'react';
import Svg, { Rect, Path, Circle, SvgProps } from 'react-native-svg';

export type IconProps = SvgProps & { size?: number; color?: string };

const QuizzesIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Notebook */}
    <Rect x="4" y="3.5" width="14" height="17" rx="3" stroke={color} strokeWidth={2} />
    {/* Binding dots */}
    <Circle cx="7.5" cy="7" r="0.9" fill={color} />
    <Circle cx="7.5" cy="10.5" r="0.9" fill={color} />
    <Circle cx="7.5" cy="14" r="0.9" fill={color} />
    {/* List lines */}
    <Path d="M10.5 7h5.5M10.5 10.5h5.5M10.5 14h5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    {/* Fun check */}
    <Path d="M5 19.5c1.2.9 2.7 1.3 4.5 1.3 1.8 0 3.3-.4 4.5-1.3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </Svg>
);

export default QuizzesIcon;


