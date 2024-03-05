export function getQueryStringInfo() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);

  const queryInfo = {};
  for (const [key, value] of params.entries()) {
    queryInfo[key] = value;
  }

  return queryInfo;
}

export function setQueryStringParameter(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url);
}