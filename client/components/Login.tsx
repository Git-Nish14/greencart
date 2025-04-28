"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const { setUser, setShowUserLogin, axios } = useAppContext();
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        router.push("/");
        setUser(data.user);
        setShowUserLogin(false);
        toast.success(state === "register" ? "Account created!" : "Logged in!");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/50 flex items-center justify-center"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-80 sm:w-[352px] flex flex-col gap-4 text-sm text-gray-600"
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              required
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-200 rounded outline-primary"
          />
        </div>

        <p className="text-center text-sm">
          {state === "register"
            ? "Already have an account?"
            : "Create an account?"}{" "}
          <span
            onClick={() => setState(state === "login" ? "register" : "login")}
            className="text-primary cursor-pointer"
          >
            Click here
          </span>
        </p>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull text-white py-2 w-full rounded-md"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
