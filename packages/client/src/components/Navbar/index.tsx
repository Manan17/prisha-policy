import { useNavigate } from "react-router-dom";
import { data } from "./dummyData";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState("Dependents");
  useEffect(() => {
    if (localStorage.getItem("role") === "employee") setNav("Dependents");
    else setNav("Employees");
  }, []);
  return (
    <div className="h-screen border w-1/6">
      <div className="border-b px-6 pr-8 py-4 flex items-center space-x-4">
        <img
          src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=944"
          className="w-[30px] h-[30px] rounded-full"
        />
        <h1>Employee Name</h1>
      </div>
      <div className="">
        <div className="flex space-x-4 items-center py-4 mb-2 px-6 pr-8 bg-blue-100">
          <IoPeopleOutline className="text-blue-700" size={25} />
          <p className="text-blue-900">{nav}</p>
        </div>
        {data?.map(({ id, Icon, title }) => (
          <div
            key={id}
            className={`flex space-x-4 items-center py-4 mb-2 px-6 pr-8 ${
              title === "Dependents" ? "bg-blue-100" : ""
            }`}
          >
            <Icon
              className={title === "Dependents" ? "text-blue-700" : ""}
              size={25}
            />
            <p className={title === "Dependents" ? "text-blue-900" : ""}>
              {title}
            </p>
          </div>
        ))}
        <button
          className="mt-8 flex space-x-4 items-center px-6 pr-8"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <CiLogout size={25} />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
