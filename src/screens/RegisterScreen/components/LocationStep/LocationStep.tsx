import React, { useContext, useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Button from '@/components/Button/Button';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';

type LocationStepProps = {
  handleGoBack: () => void;
  handleContinue: (latitude: number, longitude: number) => void;
  buttonIsLoading?: boolean;
};

export const LocationStep = ({ handleGoBack, handleContinue, buttonIsLoading }: LocationStepProps) => {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;
  const loc = registerLocale.locationStep;

  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const handleRequestLocation = async () => {
    setLoading(true);
    setDenied(false);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setDenied(true);
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      handleContinue(location.coords.latitude, location.coords.longitude);
    } catch {
      setDenied(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={32} color={theme.primary50} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Ionicons name="location-outline" size={32} color={theme.primary50} />

        <Text style={[styles.title, { color: theme.primary100 }]}>{loc.title}</Text>
        <Text style={[styles.description, { color: theme.grey20 }]}>{loc.description}</Text>

        {denied && (
          <View style={styles.deniedContainer}>
            <Text style={[styles.deniedText, { color: theme.primaryRed || '#e53e3e' }]}>{loc.permissionDenied}</Text>
            <TouchableOpacity onPress={handleOpenSettings}>
              <Text style={[styles.settingsLink, { color: theme.primary50 }]}>{loc.openSettings}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.actionContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.primary50} />
          ) : (
            <Button
              text={denied ? loc.tryAgainButton : loc.allowButton}
              onClick={handleRequestLocation}
              loading={buttonIsLoading}
              widthFull
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
  },
  headContainer: {
    width: '100%',
    marginBottom: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontFamily: 'primaryBold',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    fontFamily: 'primaryRegular',
    textAlign: 'center',
    lineHeight: 22,
  },
  deniedContainer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  deniedText: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
    textAlign: 'center',
  },
  settingsLink: {
    fontSize: 14,
    fontFamily: 'semiBold',
    textDecorationLine: 'underline',
  },
  actionContainer: {
    marginTop: 64,
    width: '100%',
  },
});
