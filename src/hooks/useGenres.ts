import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GENRES } from "../constant";
import genres from "../data/genres";
import APIClient from "../services/api-client";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// const useGenres = () => useData<Genre>('/genres');
// const useGenres = () => ({data: genres, isLoading: false, error: null})

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () => useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: genres
})

export default useGenres;