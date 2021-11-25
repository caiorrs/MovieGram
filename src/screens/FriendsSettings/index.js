import {
  EmptyText,
  EmptyWrapper,
  Title,
  Touchable,
  UserRatings,
  UserWrapper,
  Username,
  Wrapper,
} from './styles';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import React from 'react';
import {Remove} from '~/assets/icons';
import {unfollowUser} from '~/store/ducks/userInformation';

const Friends = () => {
  const dispatch = useDispatch();

  const {followingUsers} = useSelector((state) => state.UserInformationReducer);

  const renderItem = ({item, index}) => {
    return (
      <UserWrapper>
        <View>
          <Username>{item.username}</Username>
          <UserRatings>{`${item.ratings} avaliações`}</UserRatings>
        </View>
        <Touchable onPress={() => dispatch(unfollowUser(item.username))}>
          <Remove />
        </Touchable>
      </UserWrapper>
    );
  };

  const keyExtractor = (item) => item.id;

  const renderEmptyList = () => {
    return (
      <EmptyWrapper>
        <EmptyText>
          Você não está seguindo usuários, vá até a aba "Feed" para seguir
          alguém
        </EmptyText>
      </EmptyWrapper>
    );
  };

  return (
    <Wrapper>
      <Title>Seguindo</Title>
      <FlatList
        data={followingUsers}
        extraData={followingUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyList}
      />
    </Wrapper>
  );
};

export default Friends;