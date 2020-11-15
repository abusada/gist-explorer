// import useLocalStorage from "./useLocalStorage";
import createPersistedState from "use-persisted-state";
const useRecentsState = createPersistedState("GE_RECENTS");

export default function useRecents() {
  const [recents, setRecents] = useRecentsState([]);

  return {
    get() {
      return recents.reverse();
    },
    add(val) {
      if (!recents.includes(val)) {
        const updated = recents.concat(val);
        setRecents(updated);
      }
    },
    remove(val) {
      const updated = recents.filter((value) => value !== val);
      setRecents(updated);
    },
    clear() {
      setRecents([]);
    },
    hasRecents() {
      return Boolean(recents.length);
    },
  };
}
