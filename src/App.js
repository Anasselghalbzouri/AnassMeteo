import BackgroundLayer from "./components/BackgroundLayer";
import TopNav from "./components/TopNav";
import LeftPanel from "./components/LeftPanel";
import RightSidebar from "./components/RightSidebar";
import MapBackground from "./components/MapBackground";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CityDetails from "./components/CityDetails";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative flex h-screen w-full flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden bg-background-light font-display text-slate-900">
        <BackgroundLayer />
        <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <>
                    <TopNav />
                    <main className="flex flex-1 flex-col lg:flex-row px-6 md:px-12 pb-12 gap-6 md:gap-8">
                      <Outlet />
                    </main>
                  </>
                </ProtectedRoute>
              }
            >
              <Route
                path="/"
                element={
                  <>
                    <LeftPanel />
                    <RightSidebar />
                  </>
                }
              />
              <Route path="/details/:cityName" element={<CityDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
        <MapBackground />
      </div>
    </BrowserRouter>
  );
}

export default App;
