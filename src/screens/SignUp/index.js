import {Button, Input} from '~/components';
import {Image, Text, View, Keyboard, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Scroll, Subtitle, Title, Wrapper} from './styles';

import Cinema from '~/assets/images/cinema.png';
import {setIsLogged} from '~/store/ducks/app';
import {useDispatch} from 'react-redux';
import theme from '~/assets/theme';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', e =>
      setKeyboardHeight(e.endCoordinates.height),
    );
    Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardWillHide');
    };
  }, []);

  const onEnter = () => {
    if (username.length < 4) {
      setError('O nome de usuário deve ter pelo menos 4 caracteres');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter 6 caracteres ou mais');
      return;
    }
    if (password !== repeatPassword) {
      setError('Confira as entradas, as senhas devem ser iguais');
      return;
    }
    setError(null);
    dispatch(setIsLogged(true));
    return;
  };

  return (
    <Scroll
      contentContainerStyle={{alignItems: 'center'}}
      // style={{marginBottom: keyboardHeight}}
    >
      <View
        style={{
          marginBottom: 50,
        }}>
        <Image
          source={Cinema}
          style={{
            height: 300,
          }}
        />
      </View>
      <Title>Faça seu cadastro para acessar o</Title>
      <Subtitle>MovieGram</Subtitle>
      <Input
        placeholder={'Usuário'}
        value={username}
        setValue={name => setUsername(name.toLowerCase())}
      />
      <View style={{marginTop: 20, width: '100%', alignItems: 'center'}}>
        <Input
          placeholder={'Senha'}
          secureTextEntry
          value={password}
          setValue={setPassword}
        />
        <Input
          placeholder={'Repita a senha'}
          secureTextEntry
          value={repeatPassword}
          setValue={setRepeatPassword}
        />
        {error ? <SignUp>{error.message}</SignUp> : null}
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        {error ? (
          <Text style={{color: theme.colors.accent, fontSize: 16}}>
            {error}
          </Text>
        ) : null}
        <Button label="CADASTRAR" onPress={() => onEnter()} />
      </View>
    </Scroll>
  );
};

export default SignUp;
