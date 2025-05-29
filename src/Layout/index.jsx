import { Outlet } from "react-router-dom";
import Header from "../components/NavBar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
export default Layout;
