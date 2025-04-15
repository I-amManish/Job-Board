import Navbar from "./components/shared/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from "./components/Home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
