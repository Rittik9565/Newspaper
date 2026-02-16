import { Routes, Route } from "react-router-dom";  // comma fix
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
// ✅ PATH CORRECT KARO
import HomePage from "../Pages/HomePage.jsx";     // ../ → ./ 
import Contact from "../Pages/Contact.jsx";
import NotFound from "../Pages/NotFound.jsx";
  
function App() {
  return (
    <div className="App">  {/* extra spaces clean kiye */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 