
import BackgroundLayer from "./components/BackgroundLayer";
import TopNav from "./components/TopNav";
import LeftPanel from "./components/LeftPanel";


import RightSidebar from "./components/RightSidebar";
import MapBackground from "./components/MapBackground";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CityDetails from "./components/CityDetails";

function App() {
 
  return (
    
    <BrowserRouter>
      <div className='relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-white'>        
        <BackgroundLayer />       
        <TopNav />  
        <main className='flex flex-1 px-12 pb-12 gap-8 overflow-hidden'>
          <Routes>
            <Route path="/" element={
              <>
                <LeftPanel/>
                <RightSidebar />
              </>
            } />
            <Route path="/details/:cityName" element={<CityDetails />} />
          </Routes>
        </main>  
        <MapBackground />
      </div>
    </BrowserRouter>
  );
}

export default App;
