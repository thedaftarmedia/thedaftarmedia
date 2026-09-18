import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import HomePage from "@/pages/HomePage";
import ContactPage from "@/pages/ContactPage";

function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  useLenis();
  return (
    <>
      <ScrollToTop />
      <div className="grain-overlay" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
