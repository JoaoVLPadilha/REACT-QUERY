import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["species"],
    queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;
  return (
    <>
      {isFetching && <h2 className="loading">Loading</h2>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((specie) => {
          return specie.results.map((pageData) => {
            return (
              <Species
                key={pageData.name}
                name={pageData.name}
                language={pageData.language} 
                averageLifespan={pageData.average_lifespan}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
}
