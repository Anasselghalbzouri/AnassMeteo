
import BackgroundLayer from "./components/BackgroundLayer";
import TopNav from "./components/TopNav";
import LeftPanel from "./components/LeftPanel";


import RightSidebar from "./components/RightSidebar";
import MapBackground from "./components/MapBackground";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CityDetails from "./components/CityDetails";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
 
  return (
    
    <BrowserRouter>
      <div className='relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-white'>        
        <BackgroundLayer />       
        {/* TopNav should typically be inside ProtectedRoute or conditionally rendered */}
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={
            <ProtectedRoute>
              <>
                <TopNav />
                <main className='flex flex-1 px-12 pb-12 gap-8 overflow-hidden'>
                   <Outlet />
                </main>
              </>
            </ProtectedRoute>
          }>
             <Route path="/" element={
               <>
                 <LeftPanel/>
                 <RightSidebar />
               </>
             } />
             <Route path="/details/:cityName" element={<CityDetails />} />
          </Route>
        </Routes>
        <MapBackground />
      </div>
    </BrowserRouter>
  );
}

export default App;
