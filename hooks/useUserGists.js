import useSWR from "swr";
import fetcher from "../utils/fetcher";
import userGistsResponse from "../__tests__/__fixtures__/user_gists_response.json";
import userSearchResponse from "../__tests__/__fixtures__/user_search_respone.json";
export default function useUserGists(owner) {
  // return {
  //   data: userGistsResponse,
  //   isError: false,
  //   isLoading: false,
  // };

  const url = owner
    ? `https://api.github.com/users/${owner}/gists?page=0&per_page=10`
    : null;
  const { data, error } = useSWR(url, fetcher);
  return {
    data,
    isError: error,
    isLoading: url && !error && !data,
  };
}
