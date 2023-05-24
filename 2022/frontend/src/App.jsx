import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Student from "./pages/student";
import AllUsers from "./pages/allUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<h1>admin</h1>} />
        <Route path="/student" element={<Student />} />
        <Route path="/lecturer" element={<h1>lecturer</h1>} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
