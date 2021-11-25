import React from 'react';
import {Wrapper, TextInput} from './styles';

const Input = ({value, setValue, placeholder, ...props}) => {
  return (
    <Wrapper>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'#555'}
        style={{color: '#000'}}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
