import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

export const Wrapper = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
  padding-bottom: 20px;
`;

export const Scroll = styled(KeyboardAwareScrollView)`
  flex: 1;
  flex-grow: 1;
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
