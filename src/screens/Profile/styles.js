import styled from 'styled-components/native';

export const Wrapper = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 20px;
`;

export const OptionsWrapper = styled.View`
  padding-top: 50px;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 30px;
  font-weight: bold;
`;

export const Touchable = styled.Pressable`
  padding: 10px;
  margin-vertical: 10px;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 36px;
`;
