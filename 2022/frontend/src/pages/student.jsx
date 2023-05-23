import axios from "axios";
import { debounce } from "lodash";

import Navbar from "../components/navbar";

import { useEffect, useState } from "react";

const Student = () => {
  const userType = localStorage.getItem("userType");
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const [data, setData] = useState("");
  const [student, setStudent] = useState("");
  const [loading, setLoading] = useState(false);

  if (userType !== "student") {
    window.location.replace("/");
  }

  const navItems = [
    { title: "Student Profile", url: "/student" },
    {
      title: "All Users",
      url: "/users",
    },
  ];

  const getStudent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setStudent(response.data.data);
      refresh(response.data.data.other);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const refresh = async (other) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/timetable/semester/${other}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setData(response.data.data);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <Navbar items={navItems} />
      <div className="student">
        <div>
          <h1>Time Table</h1>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Hall</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              )}
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.timeslot}</td>
                    <td>{item.subject.moduleName}</td>
                    <td>{item.lecturer.userName}</td>
                    <td>{item.hall}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Student;
