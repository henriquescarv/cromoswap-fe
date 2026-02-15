import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

export default function EditProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { editProfile: editProfileLocale } = locale;

  const {
    summary: summaryStore,
    requestSummary,
  } = useStore((state: any) => state);

  useEffect(() => {
    requestSummary();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const goToEditField = (field: string, currentValue: string, label: string) => {
    navigation.navigate('EditFieldScreen', { field, currentValue, label });
  };

  const goToChangePassword = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const goToEditRegion = () => {
    navigation.navigate('EditRegionScreen');
  };

  const renderInfoRow = (label: string, value: string, field: string, editable: boolean = true) => (
    <View style={[styles.infoRow, { borderBottomColor: theme.grey5 }]}>
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: editable ? theme.grey20 : theme.grey15 }]}>{label}</Text>
        <Text style={[styles.infoValue, { color: editable ? theme.primary100 : theme.grey20 }]}>{value || '-'}</Text>
      </View>
      {editable && (
        <TouchableOpacity onPress={() => goToEditField(field, value, label)}>
          <Ionicons name="pencil" size={20} color={theme.primary100} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderRegionRow = () => (
    <View style={[styles.infoRow, { borderBottomColor: theme.grey5 }]}>
      <View style={styles.infoContent}>
        <Text style={[styles.infoLabel, { color: theme.grey20 }]}>{editProfileLocale.regionLabel}</Text>
        <Text style={[styles.infoValue, { color: theme.primary100 }]}>
          {userData.city && userData.countryState
            ? `${userData.city}, ${userData.countryState}`
            : '-'
          }
        </Text>
      </View>
      <TouchableOpacity onPress={goToEditRegion}>
        <Ionicons name="pencil" size={20} color={theme.primary100} />
      </TouchableOpacity>
    </View>
  );

  if (summaryStore.loading && !summaryStore.data) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
          <View style={[styles.loadingWrapper]}>
            <ActivityIndicator
              size="large"
              color={theme.primary50}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const userData = summaryStore.data || {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <View style={styles.wrapper}>
          <View style={[styles.headBlock]}>
            <View style={[styles.headContainer]}>
              <TouchableOpacity onPress={goBack}>
                <Ionicons
                  name={"chevron-back-outline"}
                  size={32}
                  color={theme.primary50}
                />
              </TouchableOpacity>

              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>
                {editProfileLocale.title}
              </Text>
            </View>
          </View>

          <View style={[styles.contentWrapper]}>
            {renderInfoRow(editProfileLocale.usernameLabel, userData.username, 'username', false)}
            {renderInfoRow(editProfileLocale.emailLabel, userData.email, 'email')}
            {renderRegionRow()}

            <View style={[styles.passwordButtonContainer]}>
              <Button
                text={editProfileLocale.changePasswordButton}
                variant="secondary"
                onClick={goToChangePassword}
                widthFull
                color='primaryRed'
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    flex: 1,
  },
  loadingWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headBlock: {
    padding: 16,
    paddingBottom: 24,
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
  },
  passwordButtonContainer: {
    marginTop: 32,
  },
});
