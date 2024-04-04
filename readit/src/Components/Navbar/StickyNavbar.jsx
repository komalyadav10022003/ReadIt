import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const StickyNavbar = ({ chosenOption, setChosenOption }) => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const logout = async (event) => {
    event.preventDefault();

    await fetch("/logout")
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          window.location = "http://localhost:3000/";
        }
      });
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-lg">
      <Typography
        as="li"
        variant="h5"
        className="mr-4 cursor-pointer py-1.5 font-medium pb-0 ">
        <Link
          to="/home"
          className={
            "leading-4 " +
            (chosenOption === "home"
              ? " border-b-4 border-cyan-500 text-cyan-500"
              : "text-blue-gray-900")
          }>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        className="mr-4 cursor-pointer py-1.5 font-medium pb-0 ">
        <Link
          to="/create-book"
          className={
            "leading-4 " +
            (chosenOption === "books"
              ? " border-b-4 border-cyan-500 text-cyan-500"
              : "text-blue-gray-900")
          }>
          Create Book
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="h5"
        className="mr-4 cursor-pointer py-1.5 font-medium pb-0 ">
        <Link
          to="/chatroom"
          className={
            "leading-4 " +
            (chosenOption === "community"
              ? " border-b-4 border-cyan-500 text-cyan-500"
              : "text-blue-gray-900")
          }>
          Book Search
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-lg outline-none border-none bg-white font-poppins">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1 font-medium text-4xl font-alegreya">
          <Link to="/home">ReadIt</Link>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={logout}>
              <span>Log out</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}>
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button
            fullWidth
            variant="text"
            size="sm"
            className=""
            onClick={logout}>
            <span>Log Out</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default StickyNavbar;
