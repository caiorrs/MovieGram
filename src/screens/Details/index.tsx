import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  DescriptionTitle,
  DescriptionValue,
  DescriptionWrapper,
  DetailsWrapper,
  ErrorText,
  InfoWrapper,
  PosterTitle,
  PosterWrapper,
  RateButton,
  RateLabel,
  ReloadLabel,
  Scroll,
  Touchable,
  Wrapper
} from './styles';
import React, { useEffect, useMemo, useState } from 'react';
import type {movieDetailsResponse, movieProvidersResponse, movieVideosResponse} from '../../services/types';

import { API } from '~/services';
import { RatingStars } from '~/components';
import moment from 'moment';
import { priceMasker } from '~/utils';
import { useConfiguration } from '~/hooks';
import { useLanguage } from '~/language';

const Details = ({ route }) => {
  const { movieId } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<movieDetailsResponse & {providers: movieProvidersResponse} | null>(null);
  const [movieVideos, setMovieVideos] = useState<movieVideosResponse | null>(null);
  const [showRatingField, setShowRatingField] = useState(false)

  const { DetailStrings } = useLanguage();

  const { baseURL, backdropSizes } = useConfiguration();
  const backdropSize = backdropSizes[3];

  const getMovieDetails = async () => {
    try {
      setIsLoading(true);
      const result = await API.getMovieDetails({ movie_id: movieId });
      const providersResult = await API.getMovieProviders({ movie_id: movieId })

      setMovieDetails({...result?.data, providers: {...providersResult.data}});
      setError(null);
      setIsLoading(false);
    } catch (err) {
      // console.warn('Error - ', err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getMovieVideos = async () => {
    try {
      const result = await API.getMovieVideos({ movie_id: movieId });
      // console.warn(result?.data)
      setMovieVideos(result?.data);
    } catch (err) {
      // console.warn('Error - ', err.message);
      setMovieVideos(null)
    }
  };

  const youtubeVideos = useMemo(() => {
    return movieVideos?.results?.filter(video => video?.site?.toLowerCase() === 'youtube')
  })

  useEffect(() => {
    getMovieDetails();
  }, []);

  useEffect(() => {
    if(movieDetails) getMovieVideos()
  }, [movieDetails])

  const providers = useMemo(() => {
    return movieDetails?.providers?.results?.BR?.flatrate || []
  }, [movieDetails])

  if (isLoading) {
    return (
      <Wrapper>
        <ActivityIndicator size="large" />
      </Wrapper>
    );
  }

  if (!isLoading && error) {
    return (
      <Wrapper>
        <ErrorText>{DetailStrings.errorMessage}</ErrorText>
        <Touchable onPress={getMovieDetails}>
          <ReloadLabel>{DetailStrings.reload}</ReloadLabel>
        </Touchable>
      </Wrapper>
    );
  }

  const renderRatingField = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{marginVertical: 20}}>
          <RatingStars rating={3} />
        </View>
        <TextInput
          multiline
          style={{ height: 200, width: "90%", backgroundColor: 'white', borderRadius: 20, padding: 20, paddingTop: 20 }}
        />
        <Touchable onPress={() => setShowRatingField(false)}>
          <DescriptionValue>Voltar</DescriptionValue>
        </Touchable>
      </View>
    )
  }

  const renderDetails = () => {
    return (
        <>
          <RateButton onPress={() => setShowRatingField(true)} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <RateLabel>AVALIAR</RateLabel>
          </RateButton>
          <DescriptionWrapper>
            {providers.length ? (
              <>
            <DescriptionTitle>Streaming</DescriptionTitle>
            <View style={{ flexDirection: 'row' }}>
              {providers?.map(provider => {
                return (
                  <TouchableOpacity key={provider.provider_name} onPress={() => Alert.alert("Redirecionando", `Abrindo ${movieDetails.title} em ${provider.provider_name}`)}>
                    <Image source={{ uri: `${baseURL}${backdropSize}${provider.logo_path}` }} style={{ height: 40, width: 40, margin: 10 }} />
                  </TouchableOpacity>
                  )
            })}
                </View>
              </>) : null}
            <DescriptionTitle>{DetailStrings.overview}</DescriptionTitle>
            <DescriptionValue>{movieDetails?.overview}</DescriptionValue>
          </DescriptionWrapper>
        <RatingStars rating={(movieDetails?.vote_average || 0) / 2} />
        </>
    )
  }

  return (
    <Wrapper>
      <Scroll stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <PosterWrapper source={{ uri: `${baseURL}${backdropSize}${movieDetails?.backdrop_path || movieDetails?.poster_path}` }}>
          <InfoWrapper>
            <PosterTitle>{movieDetails?.title}</PosterTitle>
            {/* <Rating>{`${movieDetails?.vote_average.toFixed(1)} / 10`}</Rating> */}
          </InfoWrapper>
        </PosterWrapper>
        <DetailsWrapper>
          {showRatingField ? renderRatingField() : renderDetails()}
          </DetailsWrapper>
      </Scroll>
    </Wrapper>
  );
};

export default Details;
