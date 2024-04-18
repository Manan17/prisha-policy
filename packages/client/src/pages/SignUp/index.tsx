import { useState } from "react";
import { trpc } from "../../lib/trpc";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
  });
  const signUp = trpc.user.signUp.useMutation();
  return (
    <div>
      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
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
      <input
        placeholder="Role"
        value={data.role}
        onChange={(e) => {
          setData({ ...data, role: e.target.value });
        }}
      />
      <button
        onClick={() => {
          signUp.mutate(
            {
              name: data.name,
              email: data.email,
              password: data.password,
              role: data.role,
            },
            {
              onSuccess: (data) => {
                console.log("User Added: ", data);
              },
              onError: () => {
                console.log("Error");
              },
            }
          );
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
