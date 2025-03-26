import React, { useContext } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import axios from 'axios';
import { urlApi } from '@/fakeenv';
import useStore from 'src/services/store';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const loginStore = useStore((state: any) => state.login);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;

  const buttonIsDisabled = password !== confirmPassword;

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${urlApi}/register`,
        {
          username,
          password,
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.data;
      if (response.status === 201) {
        Alert.alert('Register successful', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Register failed', data.message);
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <Text style={[styles.title, { color: theme.primary100 }]}>{registerLocale.title}</Text>
            <Text style={[styles.description, { color: theme.grey20 }]}>{registerLocale.description}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input
              title={registerLocale.inputs.nameTitle}
              placeholder={registerLocale.inputs.namePlaceholder}
              value={username}
              onChangeText={setUsername}
            />
            <Input
              title={registerLocale.inputs.emailTitle}
              placeholder={registerLocale.inputs.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              title={registerLocale.inputs.passwordTitle}
              placeholder={registerLocale.inputs.passwordPlaceholder}
              password
              value={password}
              onChangeText={setPassword}
            />
            <Input
              placeholder={registerLocale.inputs.confirmPasswordPlaceholder}
              password
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <Button onClick={handleRegister} text={registerLocale.registerButton} widthFull disabled={buttonIsDisabled} />
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
    paddingBottom: 50,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'semiBold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'primaryRegular',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
  headContainer: {
    width: '100%',
  },
  inputsContainer: {
    width: '100%',
    marginTop: 68,
    marginBottom: 68,
  }
});
