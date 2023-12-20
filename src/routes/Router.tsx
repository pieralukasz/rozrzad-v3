import React from "react";
import { Route } from "react-router";
import { Config } from "./index";

const Router: React.FC<Config> = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      key={route.key}
      location={route.location}
      strict={route.strict}
      render={(props) => <route.component {...props} route={route.routes} />}
    />
  );
};

export default Router;
