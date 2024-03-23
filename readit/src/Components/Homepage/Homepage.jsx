import React from "react";
import logo from "../../assets/logo512.png";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import { useState } from "react";

function Homepage() {
  //if newUser then show signup else show login
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="lg:overflow-hidden rounded-lg bg-cyan-600 max-w-full min-h-full overflow-hidden">
      <div className="mx-auto min-w-full px-6 lg:px-9 overflow-hidden">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-1 sm:grid-rows-2 sm:gap-0">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-5 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-11 px-5 relative top-8">
              <h1 className="text-9xl text-white font-bold sm:mt-5 sm:text-6xl lg:mt-5">
                <span className="block text-2xl text-semibold">The</span>
                <span className="pb-3 text-9xl block bg-clip-text text-white sm:pb-5">
                  ReadIt
                </span>
              </h1>
              <p className="text-white text-xl sm:text-3xl md:text-4xl font-medium tracking-tight">
                Because you don't have to be in that reading slump forever! And,
                never will you have to go searching for obscure books.
              </p>
              <button
                className="rounded-xl my-4 mx-4 p-2 bg-black text-white font-semibold hover:bg-white hover:text-black shadow-lg text-xl w-28"
                onClick={() => setNewUser(true)}>
                Sign Up
              </button>
              <button
                className="rounded-xl my-4 mx-4 p-2 bg-black text-white font-semibold hover:bg-white hover:text-black shadow-lg text-xl w-28"
                onClick={() => setNewUser(false)}>
                Sign In
              </button>
            </div>
          </div>
          <div className="mt-7 -mb-8 sm:-mb-11 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              {!newUser && <Login />}
              {newUser && <Signup />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
