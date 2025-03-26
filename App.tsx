import AppNavigator from '@/navigation/AppNavigator';
import { LocaleProvider } from '@/providers/LocaleProvider/LocaleProvider';
import { ThemeProvider } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    'primaryRegular': require('./assets/fonts/GalanoGrotesqueRegular.otf'),
    'primaryMedium': require('./assets/fonts/GalanoGrotesqueMedium.otf'),
    'semiBold': require('./assets/fonts/GalanoGrotesqueSemiBold.otf'),
    'primaryBold': require('./assets/fonts/GalanoGrotesqueBold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
		<ThemeProvider>
      <LocaleProvider>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </LocaleProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
