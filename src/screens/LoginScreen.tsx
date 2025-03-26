import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login: loginStore, requestLogin } = useStore((state: any) => state);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { login: loginLocale } = locale;

  const handleLogin = async () => {
    requestLogin({ username, password });
  };

  const backgroundColor = theme.highLight;
  console.log(backgroundColor)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme.primary100 }]}>{loginLocale.title}</Text>
          <View style={styles.inputsContainer}>
            <Input
              placeholder={loginLocale.usernamePlaceholder}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              placeholder={loginLocale.passwordPlaceholder}
              value={password}
              password
              onChangeText={setPassword}
            />
          </View>
          <Button onClick={handleLogin} text={loginLocale.loginButton} loading={loginStore.loading} widthFull />
          <View style={styles.registerContainer}>
            <Text style={[styles.text, { color: theme.grey20 }]}>
              {loginLocale.noAccountLabel}
            </Text>
            <Button
              text={loginLocale.registerButton}
              variant="text"
              onClick={() => navigation.navigate('Register')}
              loading={loginStore.loading}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'primaryRegular',
    paddingBottom: 80,
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
    marginTop: 12,
    marginBottom: 40,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontFamily: 'semiBold',
    width: '100%',
  },
  text: {
    fontFamily: 'primaryRegular',
  },
});
