import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { useToast } from '@/providers/ToastProvider';

export default function EditFieldScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);
  const { editField: editFieldLocale } = locale;

  const { field, currentValue, label } = route.params;

  const {
    requestSummary,
    requestChangeUserData,
  } = useStore((state: any) => state);

  const [value, setValue] = useState(currentValue || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // No additional data loading needed for simple fields
  }, [field]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await requestChangeUserData({
        dataToChange: field,
        oldValue: currentValue,
        newValue: value,
      });
      await requestSummary();
      showToast('success', 'Campo atualizado com sucesso!');
      goBack();
    } catch (error) {
      console.error('Error updating field:', error);
      showToast('warning', 'Erro ao atualizar campo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = () => {
    return (
      <Input
        placeholder={editFieldLocale.placeholder}
        value={value}
        onChangeText={setValue}
      />
    );
  };

  const isSaveDisabled = !value;

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
                {label}
              </Text>
            </View>
          </View>

          <View style={[styles.contentWrapper]}>
            <View style={[styles.formContainer]}>
              <View style={[styles.inputGroup]}>
                <Text style={[styles.label, { color: theme.primary100 }]}>
                  {label}
                </Text>
                {renderInput()}
              </View>

              <View style={[styles.buttonContainer]}>
                <Button
                  text={editFieldLocale.saveButton}
                  onClick={handleSave}
                  loading={loading}
                  widthFull
                  disabled={isSaveDisabled}
                />
              </View>
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
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
