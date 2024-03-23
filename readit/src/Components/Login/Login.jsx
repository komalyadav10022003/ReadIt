import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);
    // Handle sign-up logic here
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-600 ">
      <div className="w-full max-w-md p-6 bg-white text-semibold rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="relative mt-6">
            <input
              id="username"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="Email"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 -translate-y-5 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              USERNAME
            </label>
          </div>
          <div class="relative mt-6">
            <input
              type="password"
              id="password"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 px-1 -translate-y-5 bg-white text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              PASSWORD
            </label>
          </div>
          <button
            type="submit"
            class="mt-10 w-full rounded-md bg-black py-2 px-5 text-white hover:bg-cyan-600 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
