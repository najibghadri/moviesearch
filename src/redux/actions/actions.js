export const RESULT = "RESULT";
export const SEARCH = "SEARCH";

export function searchAction(query, page) {
  return { type: SEARCH, query: query, page: page};
}

export function resultAction(results, total_pages, total_results) {
  return { type: RESULT, results: results, total_pages: total_pages, total_results: total_results};
}