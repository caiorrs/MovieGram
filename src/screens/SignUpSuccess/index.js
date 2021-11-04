import React from 'react';
import {Image, View} from 'react-native';
import {CheckMarkIcon} from '~/assets/icons';
import {Wrapper, Text} from './styles';
import popcorn from '~/assets/images/popcorn.png';
import {Button} from '~/components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '~/store/ducks/app';

const SignUpSuccess = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch(setIsLogged(true));
    navigation.navigate('ProfileStack');
  };

  return (
    <Wrapper>
      <View style={{maxWidth: '80%'}}>
        <Text>Cadastro concluído com sucesso!</Text>
      </View>
      <Image
        source={popcorn}
        style={{width: '50%', height: 300}}
        resizeMode="contain"
      />
      <CheckMarkIcon height={30} width={30} />
      <Button label="CONTINUAR" onPress={onContinue} />
    </Wrapper>
  );
};

export default SignUpSuccess;
