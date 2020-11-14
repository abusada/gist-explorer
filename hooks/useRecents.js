import useLocalStorage from "./useLocalStorage";

export default function useRecents() {
  const [recents, setRecents] = useLocalStorage("GE_RECENT_SEARCHED", []);

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
