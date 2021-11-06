import {Label, OptionsWrapper, Title, Touchable, Wrapper} from './styles';

import {Button} from '~/components';
import React from 'react';
import {setIsLogged} from '~/store/ducks/app';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setIsLogged(false));
  };

  const onServices = () => {
    navigation.navigate('Services');
  };

  const onFriends = () => {
    navigation.navigate('Friends');
  };

  return (
    <Wrapper>
      <Title>Configurações</Title>
      <OptionsWrapper>
        <Touchable onPress={onServices}>
          <Label>Serviços que assino</Label>
        </Touchable>
        <Touchable onPress={onFriends}>
          <Label>Amigos</Label>
        </Touchable>
      </OptionsWrapper>
      <Button label="SAIR" onPress={onLogout} />
    </Wrapper>
  );
};

export default Settings;
