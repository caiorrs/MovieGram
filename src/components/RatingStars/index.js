import {Pressable, Text, View} from 'react-native';

import React from 'react';
import {Star} from '~/assets/icons';
import theme from '~/assets/theme';

const RatingStars = ({rating, onPress}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <Pressable
            onPress={() => onPress?.(star)}
            key={star}
            style={{paddingHorizontal: 5}}>
            <Star
              key={star}
              color={star <= rating ? theme.colors.accent : 'white'}
              height={40}
              width={40}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default RatingStars;
