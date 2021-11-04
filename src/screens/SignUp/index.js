import React, {useState} from 'react';
import {Pressable, Image, View} from 'react-native';
import {Input, Button} from '~/components';
import {Wrapper, Title, Subtitle, Scroll} from './styles';
import Cinema from '~/assets/images/cinema.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '~/store/ducks/app';

const SignUp = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const onEnter = () => {
    navigation.navigate('SignUpSuccess');
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
          setValue={setUsername}
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
