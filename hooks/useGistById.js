import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useGistById(id) {
  const url = id ? `https://api.github.com/gists/${id}` : null;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return {
    data,
    isError: error,
    isLoading: !data && !error,
  };
}
