// history.js
import { createBrowserHistory } from "history";
import qs from "qs";

const history = createBrowserHistory();

export function getSearch(location) {
  return qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
}

export function updateSearch(newSearch = {}, method = "push") {
  const nextUrl = `${getPathname()}?${qs.stringify(newSearch)}`;

  if (method === "replace") {
    history.replace(nextUrl);
  } else {
    history.push(nextUrl);
  }
}

export function getPathname() {
  return history.location.pathname;
}

// configure, create, and export the project's history instance
export default history;

