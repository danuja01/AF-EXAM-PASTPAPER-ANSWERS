import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const AllUsers = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const navItems = [
    { title: "Student Profile", url: "/student" },
    {
      title: "All Users",
      url: "/users",
    },
  ];

  const getAllUsers = async () => {
    setLoading(true);
    const response = await axios.get(`http://localhost:4000/api/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setData(response.data.data.filter((item) => item.userType !== "admin"));
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
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
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
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
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.userType}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
