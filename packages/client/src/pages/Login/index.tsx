import React, { useState } from "react";
import { trpc } from "../../lib/trpc";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../App";

const Login = () => {
  const [data, setData] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const login = trpc.user.login.useMutation();
  return (
    <div>
      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <input
        placeholder="Password"
        value={data.password}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <button
        onClick={() => {
          login.mutate(
            {
              email: data.email,
              password: data.password,
            },
            {
              onSuccess: (data) => {
                const res = data;
                if (res.success) {
                  localStorage.setItem("token", res.token);
                  localStorage.setItem("role", res.role);
                  setToken(res.token);
                  navigate("/");
                }
              },
              onError: () => {
                console.log("Error");
              },
            }
          );
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
