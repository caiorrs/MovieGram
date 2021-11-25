import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

export const Wrapper = styled.View``;

export const Scroll = styled(KeyboardAwareScrollView)`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.text};
`;

export const SignUp = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.colors.accent};
`;
