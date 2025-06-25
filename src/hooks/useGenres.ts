import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_GENRES } from "../constant";
import genres from "../data/genres";
import APIClient from "../services/api-client";
import Genre from "../entitites/Genre";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () => useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: genres
})

export default useGenres;