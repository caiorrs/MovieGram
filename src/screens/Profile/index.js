import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '~/components';

const Settings = () => {
  const onLogout = () => {
    console.warn('Will logout');
  };

  return (
    <View>
      <Text>Configurações</Text>
      <Text>Serviços que assino</Text>
      <Text>Amigos</Text>
      <Button label="SAIR" onPress={onLogout} />
    </View>
  );
};

export default Settings;
