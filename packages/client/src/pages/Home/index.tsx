import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../../components/Employee";
import HR from "../../components/HR";
import Navbar from "../../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>("employee");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setRole(localStorage.getItem("role"));
    }
  }, []);
  return (
    <div>
      <div className="flex">
        <Navbar />
        {role === "employee" ? <Employee /> : <HR />}
      </div>
    </div>
  );
};

export default Home;
