import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    userType: "student",
    other: "",
  });

  const [visible, setVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/api/user", data)
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setData({ ...data, userType: "lecturer" });
      setVisible(false);
    } else {
      setData({ ...data, userType: "student" });
      setVisible(true);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="login">
      <div className="form">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          {/* toggle switch */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "right",
            }}
          >
            <label htmlFor="userType">Lecturer</label>
            <label class="toggle-switch">
              <input type="checkbox" id="userType" onChange={handleCheck} />
              <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
              </div>
            </label>
          </div>

          <label htmlFor="userName">User Name</label>

          <input
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
            required
            autoComplete="off"
            type="text"
            id="userName"
          />

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

          {visible && (
            <div>
              <label htmlFor="other">Semester</label>
              <input
                value={data.other}
                onChange={(e) => setData({ ...data, other: e.target.value })}
                required
                type="number"
                id="other"
              />
            </div>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
