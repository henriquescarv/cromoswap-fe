import AppNavigator from '@/navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StyleSheet, View } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    'primaryRegular': require('./assets/fonts/GalanoGrotesqueRegular.otf'),
    'primaryMedium': require('./assets/fonts/GalanoGrotesqueMedium.otf'),
    'primaryBold': require('./assets/fonts/GalanoGrotesqueBold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
