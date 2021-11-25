import {Button, Input} from '~/components';
import {Image, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Scroll, SignUp, Subtitle, Title, Wrapper} from './styles';

import Cinema from '~/assets/images/cinema.png';
import {setIsLogged} from '~/store/ducks/app';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {heightPercentage} from '~/utils/responsive';

const SignIn = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState(__DEV__ ? 'admin' : '');
  const [password, setPassword] = useState(__DEV__ ? 'admin' : '');
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const onEnter = () => {
    if (username === 'admin' && password === 'admin') {
      setError('');
      dispatch(setIsLogged(true));
      return;
    }

    setError('Nome e/ou senha incorretos');
    return;
  };

  return (
    <Wrapper>
      <Scroll contentContainerStyle={{alignItems: 'center'}}>
        <View
          style={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            overflow: 'hidden',
            marginBottom: 50,
          }}>
          <Image
            source={Cinema}
            style={{
              height: heightPercentage(30),
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Title>Faça o login para acessar o</Title>
          <Subtitle>MovieGram</Subtitle>
          <View style={{width: '100%', alignItems: 'center', paddingTop: 20}}>
            {error.length ? <SignUp>{error}</SignUp> : null}
            <Input
              placeholder={'Usuário'}
              value={username}
              setValue={(name) => setUsername(name.toLowerCase())}
            />
            <Input
              placeholder={'Senha'}
              secureTextEntry
              value={password}
              setValue={setPassword}
            />
          </View>
          <Pressable
            style={{marginVertical: 10}}
            onPress={() => navigation.navigate('SignUp')}>
            <SignUp>Cadastre-se</SignUp>
          </Pressable>
        </View>
      </Scroll>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Button label="ENTRAR" onPress={onEnter} />
      </View>
    </Wrapper>
  );
};

export default SignIn;
