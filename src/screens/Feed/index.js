import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, Image, Pressable} from 'react-native';
import {RatingStars} from '~/components';
import {useConfiguration} from '~/hooks';
import {fakeFeed} from './fakeFeed';

const Feed = () => {
  const {baseURL, backdropSizes} = useConfiguration();
  const backdropSize = backdropSizes[3];
  const feed = [...fakeFeed, ...fakeFeed, ...fakeFeed, ...fakeFeed];

  const navigation = useNavigation();

  const onSelectMovie = (id) => {
    navigation.navigate('Details', {movieId: id});
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.posterName}</Text>
        <Pressable onPress={() => onSelectMovie(item.movieId)}>
          <Image
            source={{
              uri: `${baseURL}${backdropSize}${item.movieImage}`,
            }}
            style={{height: 200, width: '100%'}}
          />
        </Pressable>
        <RatingStars rating={item.rating} />
        <Text>{item.comment}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>FEED</Text>
      <FlatList
        data={feed}
        extraData={feed}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

export default Feed;
