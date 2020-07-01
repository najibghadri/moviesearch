import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import {
  Box,
  Icon,
  Flex,
  Spinner,
  Heading,
  Text,
  Image,
  Skeleton,
  PseudoBox,
} from "@chakra-ui/core";

import { connect } from "react-redux";

import { getImagePath, getDefaultImage, getMovie } from "./ApiService";

function MovieDetails(props) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie(props.match.match.params.movieid).then((response) => {
      setMovie(response.data);
      setLoading(false);
    });
  }, []);

  let back = props.query ? (
    <Link
      to={"/" + "?" + new URLSearchParams({ query: props.query }).toString()}
    >
      <Icon name="chevron-left" /> Back
    </Link>
  ) : (
    <Link to="/">
      <Icon name="chevron-left" /> Main page
    </Link>
  );

  let imgSrc = movie.poster_path
    ? getImagePath(movie.poster_path, "w500")
    : getDefaultImage();

  let genresText = ""
  if(movie.genres){
    movie.genres.forEach(genre => {
      genresText += genre.name + ", "
    });
    genresText = genresText.slice(0, -2)
  }

  return (
    <Box className="container">
      {back}
      <Flex className="movieDetails" flexWrap="wrap">
        <Box width="600px" marginTop="1rem" marginBottom="2rem" marginRight="2rem">
          <Skeleton isLoaded={!loading}>
            <Heading fontWeight="bold" color="red.800">
              {loading ? "__" : movie.title}
            </Heading>
          </Skeleton>

          <Skeleton marginTop="1rem" isLoaded={!loading}>
            <Text fontSize="xl">
              Release date: <b>{movie.release_date}</b>
            </Text>
          </Skeleton>
          <Skeleton  isLoaded={!loading}>
            <Text fontSize="xl">
              Rating: <b>{movie.vote_average}</b>
              <span className="rating_sub">/10.0</span>  ({movie.vote_count} votes)
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="xl">
              Genres: {genresText}
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <Text fontSize="xl">
              Runtime: {movie.runtime} minutes
            </Text>
          </Skeleton>
          <Skeleton marginTop="1rem" isLoaded={!loading}>
            <Text>{movie.overview}</Text>
          </Skeleton>
        </Box>
        <Image width="500px" rounded="lg" src={imgSrc} />
      </Flex>
    </Box>
  );
}

const mapDataToProps = (state) => {
  return {
    query: state.query,
    results: state.results,
  };
};

export default connect(mapDataToProps, null)(MovieDetails);
