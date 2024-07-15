import React from 'react';
import Sidebar from "../components/Sidebar/Sidebar";
import SearchResultVideo from "../components/SearchResultVideo";

function SearchResult({ query }) {
  return (
    <>
      <Sidebar />
      <div>
        <SearchResultVideo query={query} />
      </div>
    </>
  );
}

export default SearchResult;
