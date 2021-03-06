import React, { useState, useEffect } from "react";

import {
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Flex,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/core";

import { connect } from "react-redux";
import { searchAction, resultAction } from "./redux/actions/actions";

import { search } from "./ApiService";

const SearchControl = (props) => {
  const toast = useToast();

  const initQuery = () => {
    return (
      props.query ||
      new URLSearchParams(props.match.location.search).get("query") ||
      ""
    );
  };

  const [query, setQuery] = useState(() => initQuery());
  const [valid, setValid] = useState(true);

  const submit = () => {
    if (!query) {
      setValid(false);
      return;
    }
    props.searchAction(query, 1);
    search(query, 1)
      .then((response) => {
        props.resultAction(
          response.data.results,
          response.data.total_pages,
          response.data.total_results
        );
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: "API not available",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    props.match.history.push({
      pathname: "/",
      search: "?" + new URLSearchParams({ query: query }).toString(),
    });
  };

  useEffect(() => {
    let urlQuery = new URLSearchParams(props.match.location.search).get(
      "query"
    );

    if (urlQuery && !props.query) {
      submit();
    }
  }, []);

  useEffect(() => {
    if (query) document.title = 'Search results for "' + query + '"';
    else document.title = "Find your movie!";
  }, [query]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  const onChange = (e) => {
    if (e.target.value) {
      setValid(true);
    }
    setQuery(e.target.value);
  };

  let compactView = !!props.query;
  return (
    <Flex
      flexDirection={compactView ? "row" : "column"}
      mx={compactView ? undefined : "1rem"}
      flexWrap="wrap"
      alignItems={compactView ? "flex-start" : "center"}
    >
      <FormControl
        marginBottom="1rem"
        marginRight={compactView ? "1rem" : undefined}
        isInvalid={!valid}
      >
        <InputGroup
          width="400px"
          maxWidth={compactView ? "calc(100vw - 5rem)" : "calc(100vw - 2rem)"}
          size="lg"
        >
          <InputLeftElement
            children={<Icon name="search" color="gray.500" />}
          />
          <Input
            rounded="lg"
            value={query}
            onChange={onChange}
            onKeyDown={onKeyDown}
            isRequired
            type="search"
            placeholder="Search movies"
          />
        </InputGroup>
        <FormErrorMessage>Please fill out this field.</FormErrorMessage>
      </FormControl>
      <Button
        rounded="lg"
        size="lg"
        variantColor="red"
        variant="solid"
        onClick={submit}
      >
        Search
      </Button>
    </Flex>
  );
};

const mapDataToProps = (state) => {
  return {
    query: state.query,
    page: state.page,
    error: state.error,
  };
};

const mapDispatchToProps = {
  searchAction: searchAction,
  resultAction: resultAction,
};

export default connect(mapDataToProps, mapDispatchToProps)(SearchControl);
