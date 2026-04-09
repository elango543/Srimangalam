import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Whatsappbutton from "./components/Whatsappbutton";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/testimonials" element={<Testimonials/>} />
      </Routes>
    <Whatsappbutton/>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
