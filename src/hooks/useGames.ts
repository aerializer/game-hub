import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_GAMES } from "../constant";
import APIClient, { FetchResponse } from "../services/api-client";
import useGameQueryStore from "../store";
import Game from "../entitites/Game";

/*
const useGames = (gameQuery: GameQuery) => useData<Game>(
  '/games', 
  { params: {
      genres: gameQuery.genre?.id, 
      platforms: gameQuery.platform?.id, 
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText
    }, 
  }, 
  [gameQuery]
);
*/

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
  const gameQuery = useGameQueryStore(s => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Game>, Error>({
  queryKey: [CACHE_KEY_GAMES, gameQuery],
  queryFn: ({pageParam = 1 }) => 
    apiClient
      .getAll({
        params: {
          genres: gameQuery.genreId, 
          parent_platforms: gameQuery.platformId, 
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"),
});}

export default useGames;