import { useLocation } from "react-router-dom";

/**
 * Returns a helper that prefixes internal paths with the active locale.
 *
 * Language is encoded in the URL: English pages live under `/en/...`, Dutch
 * pages have no prefix. To keep the selected language when navigating between
 * pages, every internal link/navigate must run its path through this helper.
 *
 * Usage:
 *   const localePath = useLocalePath();
 *   <Link to={localePath("/portfolio")} />        // -> /en/portfolio when in English
 *   navigate(localePath("/assessment/quiz"));
 */
export const useLocalePath = () => {
  const location = useLocation();
  const isEnglish =
    location.pathname === "/en" || location.pathname.startsWith("/en/");

  return (path: string) => {
    // Only localize absolute in-app paths.
    if (!path.startsWith("/")) return path;
    if (!isEnglish) return path;
    if (path.startsWith("/en")) return path;
    return path === "/" ? "/en" : `/en${path}`;
  };
};
