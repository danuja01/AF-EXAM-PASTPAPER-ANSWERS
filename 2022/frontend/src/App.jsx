import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<h1>admin</h1>} />
        <Route path="/student" element={<h1>student</h1>} />
        <Route path="/lecturer" element={<h1>lecturer</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
