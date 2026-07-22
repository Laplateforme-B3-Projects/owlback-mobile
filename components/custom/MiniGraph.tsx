import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface MiniGraphProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  opacity?: number;
}

export const MiniGraph = ({
  width = '100%',
  height = 60,
  color = '#FFFFFF',
  opacity = 1,
}: MiniGraphProps) => {
  return (
    <View style={{ width, height, opacity, position: 'absolute', bottom: 15, left: 0, right: 0 }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.5" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d="M0 40 L0 35 C 10 32, 20 38, 30 30 C 40 22, 50 25, 60 15 C 70 5, 80 12, 90 8 C 95 6, 100 10, 100 10 L 100 40 Z"
          fill="url(#grad)"
        />
        <Path
          d="M0 35 C 10 32, 20 38, 30 30 C 40 22, 50 25, 60 15 C 70 5, 80 12, 90 8 C 95 6, 100 10, 100 10"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
