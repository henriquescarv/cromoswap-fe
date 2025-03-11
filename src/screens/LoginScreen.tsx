import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login: loginStore, requestLogin } = useStore((state: any) => state);

  const handleLogin = async () => {
    requestLogin({ username, password });
  };

  console.log(loginStore);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>Entrar</Text>
          <Input
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Senha"
            value={password}
            password
            onChangeText={setPassword}
          />
          <Button onClick={handleLogin} text="Entrar" loading={loginStore.loading} widthFull />
          <View style={styles.registerContainer}>
            <Text style={styles.text}>
              {'Não tem uma conta ainda?'}
            </Text>
            <TouchableHighlight onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkText}>Cadastre-se!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'primaryRegular',
    paddingBottom: 80,
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
  registerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'primaryMedium',
  },
  text: {
    fontFamily: 'primaryRegular',
  },
  button: {
    backgroundColor: '#3a70c2',
    borderRadius: 24,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: '#3a70c2',
    textDecorationLine: 'underline',
    fontFamily: 'primaryRegular',
  },
  buttonLabel: {
    fontFamily: 'primaryMedium',
    color: '#fff',
  }
});
