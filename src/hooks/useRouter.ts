import queryString from 'query-string';
import { useMemo } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

export const useRouter = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const asPath = location.pathname.replace(/\/(en|ru|uz|oz)/g, '');

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      asPath,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [asPath, params, match, location, history]);
};
