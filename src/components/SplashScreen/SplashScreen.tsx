import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import useStore from '@/services/store';
import * as SecureStore from 'expo-secure-store';
import { refreshAccessToken } from '@/services/actions/login/refreshToken';

interface SplashScreenProps {
  onFinish: (initialRoute: 'Main' | 'Login') => void;
}

const getLoginStoreCache = async () => {
  try {
    const loginStoreCacheString = await SecureStore.getItemAsync('login_store');
    return loginStoreCacheString ? JSON.parse(loginStoreCacheString) : null;
  } catch (error) {
    console.error('Error retrieving login store cache:', error);
    return null;
  }
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const { theme } = useTheme();
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const checkAuthAndInitialize = async () => {
      try {
        const store = useStore.getState() as any;
        const { setLogin, requestSummary, invalidToken } = store;

        const loginCacheData = await getLoginStoreCache();

        if (loginCacheData && loginCacheData.isAuthenticated) {
          setLogin({
            token: loginCacheData.token,
            refreshToken: loginCacheData.refreshToken,
            isAuthenticated: true
          });
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        const isAuthenticated = loginCacheData?.isAuthenticated;

        if (isAuthenticated && !invalidToken) {
          try {
            await requestSummary();
            await new Promise(resolve => setTimeout(resolve, 1500));
            onFinish('Main');
          } catch (error: any) {
            if (error?.response?.status === 401 && loginCacheData.refreshToken) {
              const refreshResult = await refreshAccessToken();

              if (refreshResult.success) {
                await requestSummary();
                await new Promise(resolve => setTimeout(resolve, 1500));
                onFinish('Main');
              } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
                onFinish('Login');
              }
            } else {
              await new Promise(resolve => setTimeout(resolve, 2000));
              onFinish('Login');
            }
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 2000));
          onFinish('Login');
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        await new Promise(resolve => setTimeout(resolve, 2000));
        onFinish('Login');
      }
    };

    checkAuthAndInitialize();
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
