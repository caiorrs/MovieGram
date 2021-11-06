import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  padding-top: 20px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 30px;
  text-align: center;
`;

export const EmptyWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  flex: 1;
`;

export const EmptyText = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 20px;
  text-align: center;
  max-width: 90%;
`;

export const UserWrapper = styled.View`
  background-color: ${({theme}) => theme.colors.text};
  font-size: 30px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-vertical: 5px;
  align-items: center;
`;

export const Username = styled.Text`
  color: ${({theme}) => theme.colors.background};
  font-size: 20px;
`;

export const UserRatings = styled.Text`
  color: ${({theme}) => theme.colors.accent};
  font-size: 16px;
`;

export const Touchable = styled.Pressable``;
