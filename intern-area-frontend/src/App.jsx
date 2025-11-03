import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InternshipList from "./pages/InternshipList";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import  "./styles/globals.css";
function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<InternshipList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
