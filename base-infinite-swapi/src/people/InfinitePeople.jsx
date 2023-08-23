import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};


export function InfinitePeople() {
  const {data, error, isLoading, isError, isFetching, fetchNextPage, hasNextPage} = useInfiniteQuery({
   queryKey: ['sw-key'],
   queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
   getNextPageParam: (lastPage) => lastPage.next || undefined
  })
  // TODO: get data for InfiniteScroll via React Query
  if(isError) return <p>error</p>
  if(isLoading) return <h3>loading</h3>
  return(
    <>
    {isFetching && <h3 className="loading">loading</h3>}
     <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {data.pages.map(pageData => {
        return (
          pageData.results.map(person => {
            return (
              <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eyeColor}
              />
            )
          })
        )
      })}
      </InfiniteScroll>
     </>
     )
}
