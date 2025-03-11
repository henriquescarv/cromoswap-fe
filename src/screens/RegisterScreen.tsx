import React from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import axios from 'axios';
import { urlApi } from '@/fakeenv';
import useStore from 'src/services/store';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginStore = useStore((state: any) => state.login);

  console.log(loginStore);

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
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastre-se!</Text>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Nome de usuário"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Senha"
            password
            value={password}
            onChangeText={setPassword}
          />
          <Button onClick={handleRegister} text="Cadastrar" widthFull />
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
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'primaryMedium',
  },
  container: {
    width: '80%',
    alignItems: 'center',
  },
});
