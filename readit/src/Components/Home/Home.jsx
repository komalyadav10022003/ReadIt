import React, { useEffect, useState } from "react";
import StickyNavbar from "../Navbar/StickyNavbar";

import { Typography } from "@material-tailwind/react";

function Home() {
  const [chosenOption, setChosenOption] = useState("home");

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const userCookie = localStorage.getItem("username");
    if (userCookie) {
    }
  }, []);

  return (
    <div>
      <StickyNavbar
        chosenOption={chosenOption}
        setChosenOption={setChosenOption}
      />
      <div className="container grid grid-cols-4 p-4 gap-2 text-cyan-600 font-semibold text-2xl font-alegreya">
        <div className="col-span-3">
          <div class="col-span-2 mb-5">
            <h5 class="pane-heading">To-Read Pile</h5>
            <div class="flex justify-center h-full col-span-2 items-center text-center">
              <p>
                You don't have anything on your{" "}
                <span class="text-base font-semibold text-darkestGrey dark:text-grey hover:text-cyan-700 dark:hover:text-cyan-500">
                  <a href="/to-read/un_eel">To-Read Pile</a>.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
