import styled from 'styled-components';

export const Wrapper = styled.View`
  background-color: ${({theme}) => theme.colors.text};
  width: 90%;
  border-radius: 10px;
`;

export const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.colors.accent};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.1px;
`;
