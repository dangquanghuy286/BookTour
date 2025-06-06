/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Header from "../components/NavBar";
import Footer from "../components/Footer";

import Breadcrumb from "../components/Breadcrumb";
import BackToTop from "../components/BackToTop";
import { useSelector } from "react-redux";
import ChatBoxContainer from "../components/ChatBox";

function Layout() {
  const isLogin = useSelector((state) => state.login);

  return (
    <>
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
        <Header />
        <Breadcrumb />
        <main>
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
        <ChatBoxContainer />
      </div>
    </>
  );
}
export default Layout;
