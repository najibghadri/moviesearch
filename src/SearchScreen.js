import React from "react";

import { Flex, Box, Text } from "@chakra-ui/core";

import { connect } from "react-redux";

import SearchControl from "./SearchControl";
import ResultGrid from "./ResultGrid";

const SearchScreen = (props) => {
  return props.query ? (
    <Box className="container">
      <SearchControl match={props.match} />
      <Text mt="0.5rem" color="gray.500">Total results: {props.total_results}</Text>
      <Box mt="2rem" width="100%"><ResultGrid/></Box>
    </Box>
  ) : (
    <Flex
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <SearchControl match={props.match} />
    </Flex>
  );
};

const mapDataToProps = (state) => {
  return {
    query: state.query,
    page: state.page,
    total_pages: state.total_pages,
    total_results: state.total_results,
  };
};

export default connect(mapDataToProps, null)(SearchScreen);
