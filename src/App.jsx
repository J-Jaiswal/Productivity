import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stopwatch from "./components/Stopwatch";
import History from "./components/History";
import Statistics from "./components/Statistics";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MobileNav from "./components/MobileNav";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Stopwatch />} />
          <Route path="/history" element={<History />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
