import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //signup functionality
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPass").value;

    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert(json.message);
        } else {
          alert("Signup successful");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-600 ">
      <div className="w-full max-w-md p-6 bg-white text-semibold rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div class="relative mt-6">
            <input
              type="text"
              id="name"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 px-1 -translate-y-5 bg-white text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              NAME
            </label>
          </div>
          <div class="relative mt-6">
            <input
              type="text"
              id="username"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 px-1 -translate-y-5 bg-white text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              USERNAME
            </label>
          </div>
          <div class="relative mt-6">
            <input
              type="email"
              id="email"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 -translate-y-5 bg-white px-1 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              EMAIL
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
          <div class="relative mt-6">
            <input
              type="password"
              id="confirmPass"
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 px-1 -translate-y-5 bg-white text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              CONFIRM PASSWORD
            </label>
          </div>
          <button class="mt-10 w-full rounded-md bg-black py-2 px-5 text-white hover:bg-cyan-600 ">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
