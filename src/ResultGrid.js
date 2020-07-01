import React from "react";

import {
  Flex,
  Spinner,
  Button,
  Heading,
  useToast
} from "@chakra-ui/core";

import { search } from "./ApiService";

import { connect } from "react-redux";
import { searchAction, resultAction } from "./redux/actions/actions";
import MovieThumbnail from "./MovieThumbnail";

const ResultGrid = (props) => {
  const toast = useToast();

  let loadingDOM = null;
  if (props.status === "loading") {
    loadingDOM = (
      <Flex width="100%" justifyContent="center">
        <Spinner thickness="4px" size="xl" />
      </Flex>
    );
  }

  let resultList = props.results.map((movie) => {
    return <MovieThumbnail key={movie.id} movie={movie} />;
  });

  const nextPage = () => {
    props.searchAction(props.query, props.page + 1);
    search(props.query, props.page + 1).then((response) => {
      props.resultAction(response.data.results, response.data.total_pages, response.data.total_results);
    })
    .catch((error) => {
      toast({
        title: "An error occurred.",
        description: "API not available",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });;
  };

  return (
    <Flex width="100%" justifyContent="space-evenly" flexWrap="wrap">
      {resultList}
      {props.status !== "loading" && props.page < props.total_pages && (
        <Flex width="100%" justifyContent="center">
          <Button
            rounded="lg"
            size="lg"
            variantColor="red"
            variant="solid"
            onClick={nextPage}
          >
            Load more ({props.total_results-props.results.length})
          </Button>
        </Flex>
      )}
      {props.status !== "loading" && props.results.length === 0 && (
        <Heading>No results found</Heading>
      )}
      {loadingDOM}
    </Flex>
  );
};

const mapDataToProps = (state) => {
  return {
    status: state.status,
    query: state.query,
    results: state.results,
    page: state.page,
    total_pages: state.total_pages,
    total_results: state.total_results,
  };
};

const mapDispatchToProps = {
  searchAction: searchAction,
  resultAction: resultAction
};

export default connect(mapDataToProps, mapDispatchToProps)(ResultGrid);
