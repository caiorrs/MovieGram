import React from 'react';
import {Wrapper, Touchable, Label} from './styles';

const Button = ({onPress, label}) => {
  return (
    <Wrapper>
      <Touchable onPress={onPress}>
        <Label>{label}</Label>
      </Touchable>
    </Wrapper>
  );
};

export default Button;
