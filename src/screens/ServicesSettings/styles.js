import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 30px;
  padding-bottom: 20px;
`;

export const Touchable = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.text};
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-vertical: 10px;
  align-items: center;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.colors.background};
  font-size: 20px;
  max-width: 80%;
`;
