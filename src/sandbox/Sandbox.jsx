import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sandbox.css";

const SandBox = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/users").then((response) => {
      const sortedUsers = response.data.sort((a, b) => {
        let fullNameA = [a.name.first, a.name.middle, a.name.last]
          .filter(Boolean)
          .join(" ");
        let fullNameB = [b.name.first, b.name.middle, b.name.last]
          .filter(Boolean)
          .join(" ");
        return fullNameA.localeCompare(fullNameB);
      });
      setUsers(sortedUsers);
    });
  }, []);

  const changeStatus = async (userId, isBusiness) => {
    const newStatus = { isBusiness: !isBusiness };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.patch(`/users/${userId}`, newStatus, config);

      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return { ...user, isBusiness: !user.isBusiness };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const eraseUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);

      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error erasing user:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {[user.name.first, user.name.middle, user.name.last]
                  .filter(Boolean)
                  .join(" ")}
              </td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin
                  ? "Admin"
                  : user.isBusiness
                  ? "Business"
                  : "Regular"}
              </td>
              <td>
                {!user.isAdmin && (
                  <button
                    onClick={() => changeStatus(user._id, user.isBusiness)}
                  >
                    Change Status
                  </button>
                )}
                <button onClick={() => eraseUser(user._id)}>Erase</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SandBox;
