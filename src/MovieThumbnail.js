import React from "react";

import { Link } from 'react-router-dom'

import {
  Box,
  Text,
  Image,
} from "@chakra-ui/core";

import { getImagePath, getDefaultImage } from "./ApiService";

function MovieThumbnail(props) {
  let imgSrc = props.movie.poster_path
    ? getImagePath(props.movie.poster_path, "w300")
    : getDefaultImage();
  return (
    <Link to={"/movies/" + props.movie.id}>
      <Box
        className="movieThumbnail"
        width="250px"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        height="550px"
        marginBottom="2rem"
      >
        <Image height="372px" rounded="md" src={imgSrc} />
        <Box align="baseline" mt={2} paddingRight="4px">
          <Text ml={2} fontsize="sm">
          <span aria-label="rating" role="img">⭐</span><b>{props.movie.vote_average}</b> ({props.movie.vote_count})
          </Text>
          <Text ml={2} fontSize="md" fontWeight="bold" color="red.800">
            {props.movie.title}
          </Text>
          <Text ml={2} fontSize="sm" className="movieThumbOverview">
            {props.movie.overview}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}

export default MovieThumbnail;
