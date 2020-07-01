import {SEARCH, RESULT, resultAction} from "../actions/actions";
import { search } from "../../ApiService";

const initialState = {
  results: [],
  query: "",
  page: 0,
  total_pages: 0,
  total_results: 0,
  status: "idle"
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      search(action.query, action.page).then((response) => {
        action.asyncDispatch(resultAction(response.data.results, response.data.total_pages, response.data.total_results));
      });
      return {
        ...state,
        status: "loading",
        page: action.page,
        query: action.query,
        results: action.page === 1 ? [] : state.results // it's a new query
      };
    case RESULT:
      return {
        ...state,
        status: "idle",
        results: [...state.results, ...action.results],
        total_pages: action.total_pages,
        total_results: action.total_results
      };
    default:
      return state;
  }
}

export default reducer;
