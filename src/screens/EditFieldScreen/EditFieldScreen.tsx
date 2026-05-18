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
import { sendOTP, verifyOTP } from '@/services/api/api';

type Step = 'input' | 'otp';

export default function EditFieldScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);
  const { editField: editFieldLocale } = locale;

  const { field, currentValue, label } = route.params;
  const isEmailField = field === 'email';

  const {
    requestSummary,
    requestChangeUserData,
  } = useStore((state: any) => state);

  const [value, setValue] = useState(currentValue || '');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('input');
  const [otpValue, setOtpValue] = useState('');
  const [verifiedToken, setVerifiedToken] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await sendOTP(value, 'change_email');
      setOtpValue('');
      setStep('otp');
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      const message = errorMessage === 'Email already exists'
        ? 'Este e-mail já está sendo usado em outra conta'
        : 'Erro ao enviar código';
      showToast('warning', message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) return;
    setLoading(true);
    try {
      const response = await verifyOTP(value, otpValue, 'change_email');
      const token = response.data.verifiedToken;
      setVerifiedToken(token);
      await handleSaveWithToken(token);
    } catch (error: any) {
      const message = 'Código inválido';
      showToast('warning', message);
      setOtpValue('');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWithToken = async (token: string) => {
    try {
      await requestChangeUserData({
        dataToChange: field,
        oldValue: currentValue,
        newValue: value,
        verifiedToken: token,
      });
      await requestSummary();
      showToast('success', 'Campo atualizado com sucesso!');
      goBack();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      const message = errorMessage === 'Email already exists'
        ? 'Este e-mail já está sendo usado em outra conta'
        : 'Erro ao atualizar campo. Tente novamente.';
      showToast('warning', message);
    }
  };

  const handleSave = async () => {
    if (isEmailField) {
      await handleSendOtp();
      return;
    }
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
    } catch (error: any) {
      const message = 'Erro ao atualizar campo. Tente novamente.';
      showToast('warning', message);
    } finally {
      setLoading(false);
    }
  };

  const isSaveDisabled = !value;

  if (isEmailField && step === 'otp') {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
          <View style={styles.wrapper}>
            <View style={styles.headBlock}>
              <View style={styles.headContainer}>
                <TouchableOpacity onPress={() => setStep('input')}>
                  <Ionicons name="chevron-back-outline" size={32} color={theme.primary50} />
                </TouchableOpacity>
                <Text style={[styles.blockTitle, { color: theme.primary100 }]}>Verificação de e-mail</Text>
              </View>
            </View>
            <View style={styles.contentWrapper}>
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: theme.primary50 }]}>
                    Enviamos um código de 6 dígitos para {value}.
                  </Text>
                  <Input
                    placeholder="000000"
                    value={otpValue}
                    onChangeText={(v) => setOtpValue(v.replace(/\D/g, '').slice(0, 6))}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    text="Verificar"
                    onClick={handleVerifyOtp}
                    loading={loading}
                    disabled={otpValue.length !== 6}
                    widthFull
                  />
                </View>
                <TouchableOpacity onPress={handleSendOtp} style={styles.resendButton}>
                  <Text style={[styles.resendText, { color: theme.primary50 }]}>Reenviar código</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

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
                <Input
                  placeholder={editFieldLocale.placeholder}
                  value={value}
                  onChangeText={setValue}
                />
              </View>

              <View style={[styles.buttonContainer]}>
                <Button
                  text={isEmailField ? 'Continuar' : editFieldLocale.saveButton}
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
  resendButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    textDecorationLine: 'underline',
  },
});
