import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_PLATFORMS } from "../constant";
import platforms from "../data/platforms";
import APIClient from "../services/api-client";
import Platform from "../entitites/Platform";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => useQuery({
  queryKey: CACHE_KEY_PLATFORMS,
  queryFn: apiClient.getAll,
  staleTime: ms("24h"),
  initialData: platforms
})

export default usePlatforms;
