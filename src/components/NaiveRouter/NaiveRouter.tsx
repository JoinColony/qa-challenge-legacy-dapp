import React, { useEffect, useState } from "react";

import HomeLayout from "../HomeLayout/HomeLayout";

interface RouteParams {
  [key: string]: string;
}

const NaiveRouter: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const matchRoute = (pattern: RegExp): RouteParams | null => {
    const match = route.match(pattern);
    if (match) {
      const keys = [...match.slice(1).keys()];
      const values = match.slice(1);
      let params: RouteParams = {};
      keys.forEach((key, index) => {
        params[key] = values[index];
      });
      return params;
    }
    return null;
  };

  // TODO
  if (route === "/") {
    return <HomeLayout />;
  } else if (route === "/profile") {
    return <div>Profile Page</div>;
  } else if (matchRoute(/\/tx\/(\w+)/)) {
    const params = matchRoute(/\/tx\/(\w+)/);
    const transactionId = params && params["0"];
    return <div>single transaction {transactionId}</div>;
  }

  return <div>404 Not Found</div>;
};

export const navigate = (path: string) => {
  window.history.pushState({}, "", path);
  const popStateEvent = new PopStateEvent("popstate");
  window.dispatchEvent(popStateEvent);
};

export default NaiveRouter;
