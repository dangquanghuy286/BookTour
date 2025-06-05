import AboutUs from "../components/About/AboutUs";
import CancellationPolicy from "../components/TermsOfService/CancellationPolicy";
import PrivacyPolicy from "../components/About/PrivacyPolicy";

import BlogDetail from "../components/Blogs/BlogDetail";
import TermsOfService from "../components/TermsOfService";
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
import TourPopuLar from "../components/Tour/TourPopuLar";
import DetailTour from "../components/Tour/DetailTour";
import LatestTour from "../components/Tour/LatestTour";
import AllTour from "../pages/Tours/AllTour";
import TourBookingFAQ from "../components/TermsOfService/TourBookingFAQ";
import TourSearch from "../pages/SearchPage";
import RedirectPage from "../pages/Login/RedirectPage";
import UserForm from "../pages/User";
import ChangePass from "../components/User/ChangePass";

import SendCodeEmail from "../components/Pass/SendCodeEmail";
import VerifyCode from "../components/Pass/VerifyCode";
import ChangePassWithCode from "../components/Pass/ChangePassWithCode";

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
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/cancellation",
        element: <CancellationPolicy />,
      },
      {
        path: "/termsofservice",
        element: <TermsOfService />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/faq",
        element: <TourBookingFAQ />,
      },
      {
        path: "/tourSearch",
        element: <TourSearch />,
      },
      {
        path: "tour",
        element: <Tours />,
        children: [
          {
            path: "getalltour",
            element: <AllTour />,
          },
          {
            path: "feature_tours",
            element: <TourPopuLar />,
          },
          {
            path: "latest_tours",
            element: <LatestTour />,
          },
        ],
      },
      {
        path: "tours/:slug",
        element: <DetailTour />,
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
        path: "redirect",
        element: <RedirectPage />,
      },

      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetail />,
      },

      {
        path: "user",
        element: <UserForm />,
      },

      {
        path: "user/changepassword",
        element: <ChangePass />,
      },
      {
        path: "sendEmail",
        element: <SendCodeEmail />,
      },
      {
        path: "verifyCode",
        element: <VerifyCode />,
      },
      {
        path: "changePasswordCode",
        element: <ChangePassWithCode />,
      },
    ],
  },
];
