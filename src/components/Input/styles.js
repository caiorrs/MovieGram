import styled from 'styled-components';

export const Wrapper = styled.View`
  background-color: ${({theme}) => theme.colors.text};
  width: 90%;
  margin-vertical: 10px;
  border-radius: 10px;
`;

export const TextInput = styled.TextInput`
  padding-left: 20px;
  height: 60px;
`;
