import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let timeout: number;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMatches(event.matches);
      }, 100);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      clearTimeout(timeout);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
