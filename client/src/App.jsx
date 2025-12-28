import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./shared/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./shared/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
