import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/login", data)
      .then((resposne) => {
        localStorage.setItem("accessToken", resposne.data.accessToken);
        localStorage.setItem("userType", resposne.data.userType);

        if (resposne.data.userType === "admin") navigate("/admin");
        else if (resposne.data.userType === "student") navigate("/student");
        else if (resposne.data.userType === "lecturer") navigate("/lecturer");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            type="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            type="password"
            id="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
