import {BoxChecked, BoxUnchecked} from '~/assets/icons';
import {FlatList, View} from 'react-native';
import {Label, Title, Touchable, Wrapper} from './styles';
import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {setServices} from '~/store/ducks/userInformation';

const Services = () => {
  const dispatch = useDispatch();

  const {streamingServices} = useSelector(
    (state) => state.UserInformationReducer,
  );

  const onSelectService = (id) => {
    dispatch(setServices(id));
  };

  const renderItem = ({item, index}) => {
    return (
      <Touchable onPress={() => onSelectService(item.id)}>
        <Label>{item.name}</Label>
        {item.selected ? <BoxChecked /> : <BoxUnchecked />}
      </Touchable>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <Wrapper>
      <Title>Meus Serviços</Title>
      <View style={{width: '90%'}}>
        <FlatList
          data={streamingServices}
          extraData={streamingServices}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{width: '100%', paddingBottom: 100}}
        />
      </View>
    </Wrapper>
  );
};

export default Services;
