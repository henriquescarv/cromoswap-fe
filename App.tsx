import AppNavigator from '@/navigation/AppNavigator';
import { LocaleProvider } from '@/providers/LocaleProvider/LocaleProvider';
import { ThemeProvider } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { SplashScreen } from '@/components/SplashScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  let [fontsLoaded] = useFonts({
    'primaryRegular': require('./assets/fonts/GalanoGrotesqueRegular.otf'),
    'primaryMedium': require('./assets/fonts/GalanoGrotesqueMedium.otf'),
    'semiBold': require('./assets/fonts/GalanoGrotesqueSemiBold.otf'),
    'primaryBold': require('./assets/fonts/GalanoGrotesqueBold.otf'),
  });

  if (!fontsLoaded || showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>
          <View style={styles.container}>
            <AppNavigator onFinishSplash={() => setShowSplash(false)} />
          </View>
        </ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
