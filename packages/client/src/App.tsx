import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import "./App.css";
import { trpc } from "./lib/trpc";
import { Route, Routes } from "react-router-dom";
import Cards from "./components/Cards";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
let token: string | null = localStorage.getItem("token");
export const setToken = (t: string) => {
  token = t;
};
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          headers() {
            return {
              Authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
    });
  });

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
