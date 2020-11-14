import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useUserSearch(query) {
  const url = query
    ? `https://api.github.com/search/users?q=${query}&page=0&per_page=10`
    : null;
  const { data, error } = useSWR(url, fetcher);
  return {
    data,
    isError: error,
    isLoading: url && !error && !data,
  };
}
