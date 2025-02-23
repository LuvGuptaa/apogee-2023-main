import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Armageddon from "./components/JSX/Armageddon";
import Error from "./components/JSX/Error";
import Sponsors from "./components/JSX/Sponsors";
import "./index.css";

const Route = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <App />,
          errorElement: <Error />,
        },
        {
          path: "/armageddon/",
          element: <Armageddon />,
          errorElement: <Error />,
        },
        {
          path: "/sponsors/",
          element: <Sponsors />,
          errorElement: <Error />,
        },
      ])}
    />
  );
};

export default Route;
