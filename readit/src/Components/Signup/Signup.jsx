import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-600 ">
      <div className="w-full max-w-md p-6 bg-white text-semibold rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div class="relative mt-6">
            <input
              type="email"
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
              class="peer w-full border rounded-xl placeholder:text-transparent text-lg p-1"
              placeholder="name"
            />
            <label
              for="email"
              class="absolute left-0 ml-2 mt-2 px-1 -translate-y-5 bg-white text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ">
              PASSWORD
            </label>
          </div>
          <button class="mt-10 w-full rounded-md bg-black py-2 px-5 text-white hover:bg-cyan-600 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
