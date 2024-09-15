import React from 'react';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar } from './components'; 
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'; 
import { AuthProvider } from "./contexts/authContext";

const App = () => (
  <div>
    
    <AuthProvider>

    <Router>
      <Navbar />  {/* Move Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<Header />} />
        {/* You can add more Routes here if needed */}
      </Routes>
    </Router>
    <Header />
    <AboutUs />
    <SpecialMenu />
    <Chef />
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <Footer />
    </AuthProvider>

  </div>
);

export default App;
