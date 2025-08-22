import React from 'react';
import Svg, { Path, Circle, SvgProps } from 'react-native-svg';

export type IconProps = SvgProps & { size?: number; color?: string };

const GoalsIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280', ...props }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Trophy cup */}
    <Path d="M7 6h10v3.5c0 2.5-2 4.5-4.5 4.5h-1C9 14 7 12 7 9.5V6z" stroke={color} strokeWidth={2} />
    {/* Handles */}
    <Path d="M7 7.5H5.5C4.1 7.5 3 8.6 3 10s1.1 2.5 2.5 2.5H7" stroke={color} strokeWidth={2} />
    <Path d="M17 7.5h1.5C19.9 7.5 21 8.6 21 10s-1.1 2.5-2.5 2.5H17" stroke={color} strokeWidth={2} />
    {/* Stem and base */}
    <Path d="M10 14.5v2.5h4v-2.5M8 20.5h8" stroke={color} strokeWidth={2} strokeLinecap="round" />
    {/* Star accent */}
    <Path d="M12 4l.6 1.2 1.3.2-1 .9.2 1.3L12 7l-1.1.6.2-1.3-1-.9 1.3-.2L12 4z" fill={color} />
  </Svg>
);

export default GoalsIcon;


