import React from "react";
import { Input, Button, Avatar, Card } from "@material-tailwind/react";

const Community = () => {
  const focusSearch = () => {
    // Define the behavior of focusing on the search input
    // For example:
    // document.querySelector('.search-input').focus();
  };

  const handleHeartClick = (heartId) => {
    // Define the behavior of handling heart click
    // For example:
    // const heartElement = document.getElementById(heartId);
    // heartElement.classList.toggle('text-red-500'); // Toggle heart color
    // const heartCountElement = document.getElementById(`heartCount${heartId}`);
    // Update heart count or perform any other action
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Community</h2>
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={focusSearch}>
        <Input type="text" placeholder="Search by username or email" />
        <Button color="lightBlue" ripple="light">
          Search
        </Button>
      </div>
      <Card className="mt-4">
        <div className="flex items-center space-x-4 text-gray-500">
          <p className="text-sm">less than a minute ago</p>
          <Avatar src="C:\Users\2004b\OneDrive\Pictures\1000_F_259289055_tmfqa60bcv50aBkPA7UPPB1UzfB5OwL8.jpg" />
          <p className="ml-4">
            <span className="font-semibold">
              <a href="abridger_profile.html" className="abridger">
                Abridger
              </a>
            </span>
            <span className="text-xl ml-4">started reading:</span>
          </p>
        </div>
        <i
          className="far fa-heart heart ml-4"
          id="heart1"
          onClick={() => handleHeartClick("heart1")}></i>
        <span id="heartCount1"></span>
        <div className="flex items-center space-x-4 mt-4">
          <img
            src="C:\Users\2004b\OneDrive\Pictures\41flnoALm7L.jpg"
            alt="Book cover"
            className="w-24 h-32 object-cover"
          />
          <div>
            <p className="font-bold">Henry and Evalin</p>
            <p className="text-sm">Peny Zeller</p>
            <p className="text-sm">emotional funny lighthearted medium-paced</p>
          </div>
        </div>
      </Card>
      {/* Additional Card components */}
      <div className="mt-8 text-center">
        <p>You're not following anybody yet!</p>
        <p>
          Search for your friends or explore the Community feed to find new
          readers to follow.
        </p>
      </div>
      <div className="mt-8 text-center">
        <p>
          If you record more of your reading activity, we can find users similar
          to you!
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <Button color="lightBlue" ripple="light">
          Buddy Reads
        </Button>
        <Button color="lightBlue" ripple="light" className="ml-4">
          Readalongs
        </Button>
      </div>
    </div>
  );
};

export default Community;
