import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";


import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NASA_Land from "./pages/NASA_Land"
import NASA_ivl from "./pages/NASA_ivl"
import APOD from "./pages/APOD"
import ISRO_Land from "./pages/ISRO_Land"
import Spacecraft from "./pages/Spacecraft";
import Launchers from "./pages/Launchers";
import Centres from "./pages/Centres";
import Favorites from "./pages/Favorites";
import Customers from "./pages/Customers";
import EPIC from "./pages/EPIC";
import NEO from "./pages/NEO"
import Galaxy from "./pages/Galaxy";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nasa_dashboard" element={<NASA_Land />} />
            <Route path="/apod" element={<APOD/>}/>
            <Route path="/space_library" element={<NASA_ivl/>}/>
            <Route path="/epic" element={<EPIC/>}/>
            <Route path="/neo" element={<NEO/>}/>
            <Route path="/galaxy" element={<Galaxy/>}/>
            <Route path="/isro_dashboard" element={<ISRO_Land />} />
            <Route path="/spacecrafts" element={<Spacecraft />} />
            <Route path="/launchers" element={<Launchers />} />
            <Route path="/centres" element={<Centres />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/chat" element={<AIChatbot />} />
          </Routes>
        </main>
        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;