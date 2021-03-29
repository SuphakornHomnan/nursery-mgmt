import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          (localStorage.getItem("token") &&
            localStorage.getItem("role") === "accountant") ||
          localStorage.getItem("role") === "admin"
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                // state: {
                //   from: props.location,
                // },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
