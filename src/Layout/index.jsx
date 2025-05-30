import { Outlet } from "react-router-dom";
import Header from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";
import Breadcrumb from "../components/Breadcrumb";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
        <Header />
        <Breadcrumb />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ChatBox />
      </div>
    </>
  );
}
export default Layout;
