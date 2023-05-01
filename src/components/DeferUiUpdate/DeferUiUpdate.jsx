import React, { Suspense, useDeferredValue, useId, useState } from "react";
import useSWR from "swr";

export default function DeferUiUpdate() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const searchInputId = useId();
  console.log(searchInputId);
  return (
    <div>
      <h1>Defering update</h1>
      <ol>
        <li>Showing stale content while fresh content is loading</li>
        <li>Indicating that the content is stale</li>
        <li>Deferring re-rendering for a part of the UI</li>
      </ol>
      <input
        type="text"
        aria-describedby={searchInputId}
        placeholder="Search any query"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}

async function fetchData(url) {
  const response = await fetch(`http://localhost:3001/${url}`);
  return response.json();
}
function SearchResults({ query }) {
  const { data, error, isLoading } = useSWR(`search?q=${query}`, fetchData, {
    suspense: true,
  });

  if (!query) {
    return <div>Found no results</div>;
  }

  return (
    <ul>
      {data.data.map((title) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  );
}
