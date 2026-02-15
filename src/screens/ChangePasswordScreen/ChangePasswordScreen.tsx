import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Clipboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { useToast } from '@/providers/ToastProvider';
import formsValidators from '@/validators/forms/forms';
import { sendPasswordResetCode, validateResetCode, resetPassword } from '@/services/api/api';

export default function ChangePasswordScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);
  const { editField: editFieldLocale, editProfile: editProfileLocale } = locale;

  const {
    requestSummary,
    requestChangeUserData,
  } = useStore((state: any) => state);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [hasValidClipboard, setHasValidClipboard] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const codeInputRef = useRef<TextInput>(null);

  const { verifyEmail } = formsValidators;

  const isEmailValid = email.length > 0 && verifyEmail(email) === null;

  useEffect(() => {
    if (step === 2 && codeValue.length === 6) {
      // Código completo, validar antes de avançar
      validateCode();
    }
  }, [codeValue, step]);

  const validateCode = async () => {
    setLoading(true);
    try {
      await validateResetCode(email, codeValue);
      // Código válido, avançar para step 3
      setLoading(false);
      setTimeout(() => {
        setStep(3);
      }, 300);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Código inválido';
      showToast('warning', message);
      setCodeValue(''); // Limpar código para tentar novamente
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar área de transferência quando entrar no step 2
    if (step === 2) {
      checkClipboard();
    }
  }, [step]);

  const checkClipboard = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      const isValidCode = /^\d{6}$/.test(clipboardContent);
      setHasValidClipboard(isValidCode);
    } catch (error) {
      setHasValidClipboard(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleContinueStep1 = async () => {
    setLoading(true);
    try {
      await sendPasswordResetCode(email);
      setStep(2);
      // Focar no input de código após um pequeno delay
      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 100);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao enviar código';
      console.log('cheguei aqui', error.response);
      showToast('warning', message);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // Aceita apenas números e limita a 6 caracteres
    const numbers = value.replace(/\D/g, '').slice(0, 6);
    setCodeValue(numbers);
  };

  const handlePasteCode = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      const numbers = clipboardContent.replace(/\D/g, '').slice(0, 6);
      setCodeValue(numbers);
      setHasValidClipboard(false);
    } catch (error) {
      console.error('Error pasting code:', error);
    }
  };

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      showToast('warning', editFieldLocale.passwordMismatch);
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, codeValue, newPassword);
      showToast('success', 'Senha alterada com sucesso!');
      goBack();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao alterar senha';
      showToast('warning', message);
    } finally {
      setLoading(false);
    }
  };

  const isSaveDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;

  const renderStep1 = () => (
    <View style={[styles.formContainer]}>
      <View style={[styles.inputGroup]}>
        <Text style={[styles.label, { color: theme.primary100 }]}>
          Insira seu e-mail abaixo para continuar
        </Text>
        <Input
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={[styles.buttonContainer]}>
        <Button
          text="Continuar"
          onClick={handleContinueStep1}
          loading={loading}
          widthFull
          disabled={!isEmailValid}
        />
      </View>
    </View>
  );

  const renderStep2 = () => {
    const digits = codeValue.split('');
    while (digits.length < 6) {
      digits.push('');
    }

    return (
      <View style={[styles.formContainer]}>
        <View style={[styles.inputGroup]}>
          <Text style={[styles.label, { color: theme.primary100 }]}>
            Insira o código que enviamos para o seu e-mail para prosseguir com a alteração da sua senha
          </Text>
          <TouchableOpacity
            style={styles.codeContainer}
            onPress={() => codeInputRef.current?.focus()}
            activeOpacity={0.7}
          >
            {digits.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.codeInput,
                  {
                    backgroundColor: theme.grey5,
                    borderColor: digit ? theme.primary50 : theme.grey10,
                  },
                ]}
              >
                <Text style={[styles.codeInputText, { color: theme.primary100 }]}>
                  {digit}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
          <TextInput
            ref={codeInputRef}
            value={codeValue}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.hiddenInput}
            autoFocus
          />
        </View>
        {hasValidClipboard && codeValue.length < 6 && (
          <TouchableOpacity
            onPress={handlePasteCode}
            style={styles.pasteButton}
          >
            <Text style={[styles.pasteButtonText, { color: theme.primary50 }]}>
              Colar código
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderStep3 = () => (
    <View style={[styles.formContainer]}>
      <View style={[styles.inputGroup]}>
        <Text style={[styles.label, { color: theme.primary100 }]}>
          {editFieldLocale.newPasswordLabel}
        </Text>
        <Input
          placeholder={editFieldLocale.placeholder}
          value={newPassword}
          onChangeText={setNewPassword}
          password
        />
      </View>

      <View style={[styles.inputGroup]}>
        <Text style={[styles.label, { color: theme.primary100 }]}>
          {editFieldLocale.confirmPasswordLabel}
        </Text>
        <Input
          placeholder={editFieldLocale.confirmPasswordPlaceholder}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          password
        />
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
  );

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
                Alterar senha
              </Text>
            </View>
          </View>

          <View style={[styles.contentWrapper]}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
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
    paddingTop: 64,
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
    marginTop: 32,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 8,
  },
  codeInput: {
    flex: 1,
    height: 56,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputText: {
    fontSize: 24,
    fontFamily: 'primaryBold',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 1,
    width: 1,
  },
  pasteButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pasteButtonText: {
    fontSize: 14,
    fontFamily: 'semiBold',
  },
});
