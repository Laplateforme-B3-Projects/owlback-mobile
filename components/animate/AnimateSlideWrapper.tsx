import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const AnimateSlideWrapper = ({
  children,
  duration = 600,
}: {
  children: ReactNode;
  duration?: number;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: duration,
        easing: Easing.ease,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        useNativeDriver: true,
        duration: duration,
        easing: Easing.ease,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacity,
        transform: [{ translateY }],
      }}>
      {children}
    </Animated.View>
  );
};
