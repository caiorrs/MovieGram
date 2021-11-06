import {Button, Input} from '~/components';
import {Image, Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Scroll, Subtitle, Title, Wrapper} from './styles';

import Cinema from '~/assets/images/cinema.png';
import {setIsLogged} from '~/store/ducks/app';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const onEnter = () => {
    dispatch(setIsLogged(true));
    // navigation.navigate('SignUpSuccess');
    // if (username === '' || password === '' || password !== repeatPassword)
    //   setError(new Error('Nome e/ou senha incorretos'));
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
        <Title>Faça seu cadastro para acessar o</Title>
        <Subtitle>MovieGram</Subtitle>
        <Input
          placeholder={'Usuário'}
          value={username}
          setValue={(name) => setUsername(name.toLowerCase())}
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
      </Scroll>
      <View>
        <View style={{width: '100%', alignItems: 'center', marginVertical: 20}}>
          <Button label="CADASTRAR" onPress={onEnter} />
        </View>
      </View>
    </Wrapper>
  );
};

export default SignUp;
