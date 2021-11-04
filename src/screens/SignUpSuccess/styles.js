import styled from 'styled-components';

export const Wrapper = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  padding-vertical: 20px;
  align-items: center;
  justify-content: space-evenly;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.colors.text};
  text-align: center;
  font-size: 36px;
`;
