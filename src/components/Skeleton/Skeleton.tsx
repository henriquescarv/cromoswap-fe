import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { SkeletonProps } from './Skeleton.types';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style = {},
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}: SkeletonProps) => {
  const { theme } = useTheme();

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          opacity,
          backgroundColor: theme.grey5,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});

export default Skeleton;
