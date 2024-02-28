import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
    );
}

export default App;
