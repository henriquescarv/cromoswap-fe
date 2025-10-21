import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Animated } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const { theme } = useTheme();
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    setTimeout(() => {
      onFinish()
    }, 2000)
  }, [onFinish]);

  return (
    <Animated.View style={[
      styles.logoContainer,
      {
        backgroundColor: theme.primary50,
        opacity: fadeAnim
      }
    ]}>
      <Image
        source={require('@/images/logo_splash.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '25%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: '500',
  },
});
