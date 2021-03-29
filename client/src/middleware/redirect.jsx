import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const role = useSelector((state) => state.userReducer.position);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token") && role !== null) {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
