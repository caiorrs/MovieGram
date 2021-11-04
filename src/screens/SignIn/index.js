import React, {useState} from 'react';
import {Pressable, Image, View} from 'react-native';
import {Input, Button} from '~/components';
import {Wrapper, SignUp, Title, Subtitle, Scroll} from './styles';
import Cinema from '~/assets/images/cinema.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '~/store/ducks/app';

const SignIn = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const onEnter = () => {
    if (username === 'admin' && password === 'admin') {
      setError(null);
      dispatch(setIsLogged(true));
      return;
    }

    setError(new Error('Nome e/ou senha incorretos'));
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
              height: 300,
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
          <View style={{width: '100%', alignItems: 'center'}}>
            <Input
              placeholder={'Usuário'}
              value={username}
              setValue={setUsername}
            />
            <Input
              placeholder={'Senha'}
              secureTextEntry
              value={password}
              setValue={setPassword}
            />

            {error ? <SignUp>{error.message}</SignUp> : null}
          </View>
          <Pressable
            style={{marginVertical: 10}}
            onPress={() => navigation.navigate('SignUp')}>
            <SignUp>Cadastre-se</SignUp>
          </Pressable>
        </View>
      </Scroll>
      <View style={{width: '100%', alignItems: 'center', marginVertical: 20}}>
        <Button label="ENTRAR" onPress={onEnter} />
      </View>
    </Wrapper>
  );
};

export default SignIn;
