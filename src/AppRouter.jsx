import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage, LoadingPage, ResultsPage } from "./pages";
import { LoadingComponent } from "./components";
export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/share:uid" element={<ResultsPage />} />
        <Route path="/search:input" element={<LoadingPage />} />
        <Route paht="/*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </>
  );
}
