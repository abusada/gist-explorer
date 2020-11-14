import React, { useEffect, useState } from "react";
import useDebounced from "../hooks/useDebounced";
import useRecents from "../hooks/useRecents";
import useUserSearch from "../hooks/useUserSearch";
import Recents from "./Recents";
import SearchField from "./SearchField";
import UsersList from "./UsersList";

const UserSearch = ({ selectedUser, onSelect, onSearchInitiated }) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounced(searchValue, 500);
  const { data, isLoading } = useUserSearch(debouncedSearchValue);

  const recents = useRecents();
  const showRecents = recents.hasRecents() && !data && !isLoading;

  useEffect(() => {
    debouncedSearchValue && recents.add(debouncedSearchValue);
    onSearchInitiated && onSearchInitiated(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleSearchClear = () => setSearchValue("");
  const handleSearch = (e) => setSearchValue(e.target.value);

  return (
    <>
      <SearchField
        value={searchValue}
        onChange={handleSearch}
        onClear={handleSearchClear}
        placeholder="Find Github Users"
      />
      <UsersList
        users={data?.items}
        onSelect={onSelect}
        isLoading={isLoading}
        selectedUserid={selectedUser?.id}
      />

      {showRecents && (
        <Recents
          recents={recents.get()}
          onDelete={(value) => recents.remove(value)}
          onSelect={(selection) => setSearchValue(selection)}
        />
      )}
    </>
  );
};

export default UserSearch;
