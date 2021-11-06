import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {Star} from '~/assets/icons';
import {ThemeContext} from 'styled-components';

const RatingStars = ({rating, onPress}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={{flexDirection: 'row'}}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <Star
            key={star}
            color={star <= rating ? 'red' : 'white'}
            height={40}
            width={40}
          />
        );
      })}
    </View>
  );
};

export default RatingStars;
