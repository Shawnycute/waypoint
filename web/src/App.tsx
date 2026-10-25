import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import CrisisBanner from "./components/CrisisBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { IS_EXAMPLE_DATA } from "./lib/data";
import Ask from "./pages/Ask";
import Home from "./pages/Home";
import TabPage from "./pages/TabPage";

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <CrisisBanner />
      {IS_EXAMPLE_DATA && (
        <p className="example-note">Example data: these records are made up for testing. They are not real offices.</p>
      )}
      <main id="main" className="page" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health" element={<TabPage key="health" tab="health" />} />
        <Route path="education" element={<TabPage key="education" tab="education" />} />
        <Route path="work" element={<TabPage key="work" tab="work" />} />
        <Route path="ask" element={<Ask />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
