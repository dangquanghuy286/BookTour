import { element } from "prop-types";
import Layout from "../Layout";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import Destination from "../pages/Destination";
import NotFound from "../pages/Error404";
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import DetailTour from "../pages/Tours/DetailTour";
import FeatureTours from "../pages/Tours/FeatureTours";
import LatestTour from "../pages/Tours/LatestTour";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/intro",
        element: <Intro />,
      },
      {
        path: "tour",
        element: <Tours />,
        children: [
          {
            index: true,
            element: <Tours />,
          },
          {
            path: "feature_tours",
            element: <FeatureTours />,
          },
          {
            path: "lastest_tours",
            element: <LatestTour />,
          },
          {
            path: ":id",
            element: <DetailTour />,
          },
        ],
      },
      {
        path: "destination",
        element: <Destination />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },

      {
        path: "blog",
        element: <Blog />,
      },
    ],
  },
];
