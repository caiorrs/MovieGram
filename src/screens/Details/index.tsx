import moment from 'moment';
import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { VideosList } from '~/components';
import { useConfiguration } from '~/hooks';
import { useLanguage } from '~/language';
import { API } from '~/services';
import { priceMasker } from '~/utils';
import type {movieDetailsResponse, movieProvidersResponse, movieVideosResponse} from '../../services/types';
import {
  Wrapper, PosterWrapper, InfoWrapper, PosterTitle, Rating, DetailsWrapper,
  StatsWrapper, StatsTitle, StatsValue, DescriptionWrapper, DescriptionTitle, DescriptionValue,
  Scroll, ErrorText, Touchable, ReloadLabel,
} from './styles';

const Details = ({ route }) => {
  const { movieId } = route?.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDetails, setMovieDetails] = useState<movieDetailsResponse & {providers: movieProvidersResponse} | null>(null);
  const [movieVideos, setMovieVideos] = useState<movieVideosResponse | null>(null);

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

  const movieGenres = useMemo(() => movieDetails?.genres?.map((genre) => genre?.name).join(', '), [movieDetails]);

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

  return (
    <Wrapper>
      <Scroll stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <PosterWrapper source={{ uri: `${baseURL}${backdropSize}${movieDetails?.backdrop_path || movieDetails?.poster_path}` }}>
          <InfoWrapper>
            <PosterTitle>{movieDetails?.title}</PosterTitle>
            <Rating>{`${movieDetails?.vote_average.toFixed(1)} / 10`}</Rating>
          </InfoWrapper>
        </PosterWrapper>
        <DetailsWrapper>
          <DescriptionWrapper>
            <DescriptionTitle>Streaming</DescriptionTitle>
            <View style={{ flexDirection: 'row' }}>
              {movieDetails?.providers?.results?.BR?.flatrate?.map(provider => {
                return (
                  <TouchableOpacity onPress={() => Alert.alert("Redirecionando", `Abrindo ${movieDetails.title} em ${provider.provider_name}`)}>
                    <Image source={{ uri: `${baseURL}${backdropSize}${provider.logo_path}` }} style={{ height: 40, width: 40, margin: 10 }} />
                  </TouchableOpacity>
                  )
            })}
              </View>
            <DescriptionTitle>{DetailStrings.overview}</DescriptionTitle>
            <DescriptionValue>{movieDetails?.overview}</DescriptionValue>
          </DescriptionWrapper>
          {/* <StatsTitle>{DetailStrings.moreInfo}</StatsTitle> */}
          {/* {youtubeVideos?.length ? (
            <VideosList 
              videos={youtubeVideos}
              title="Videos"
            />
          ) : null} */}
          {/* <StatsWrapper>
            <StatsTitle>{DetailStrings.duration}</StatsTitle>
            <StatsValue>{movieDetails?.runtime} min</StatsValue>
            <StatsTitle>{DetailStrings.year}</StatsTitle>
            <StatsValue>{moment(movieDetails?.release_date).format('YYYY')}</StatsValue>
            <StatsTitle>{DetailStrings.revenue}</StatsTitle>
            <StatsValue>{priceMasker(movieDetails?.revenue)}</StatsValue>
            <StatsTitle>{DetailStrings.budget}</StatsTitle>
            <StatsValue>{!movieDetails?.budget ? DetailStrings.unknown : priceMasker(movieDetails?.budget)}</StatsValue>
            <StatsTitle>{DetailStrings.genres}</StatsTitle>
            <StatsValue>{movieGenres}</StatsValue>
            {movieDetails?.homepage ? (
              <>
                <StatsTitle>{DetailStrings.website}</StatsTitle>
                <StatsValue>{movieDetails?.homepage}</StatsValue>
              </>
              ) : null}
            <StatsTitle>{DetailStrings.originalTitle}</StatsTitle>
            <StatsValue>{movieDetails?.original_title}</StatsValue>
          </StatsWrapper> */}
        </DetailsWrapper>
      </Scroll>
    </Wrapper>
  );
};

export default Details;
