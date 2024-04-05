import React, { useState } from "react";
import { pipeline } from "@xenova/transformers";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Searchbar from "../Searchbar/Searchbar";

const genAI = new GoogleGenerativeAI("AIzaSyAoPvUoHjHcp8KkWKRXXY9tAdbHNP0McUs");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const searchGenre = async (searchValue) => {
  const results = await fetch(`/search?q=${searchValue}&type=genre`)
    .then((res) => res.json())
    .then((json) => json);

  return results;
};

const Recommender = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const [genres, setGenres] = useState([]);

  const fetchRecommendation = async () => {
    try {
      const newPrompt =
        "Give me book recommendations if I like the following genres: " +
        genres.map((genre) => " " + genre.value);

      console.log(newPrompt);
      const result = await model.generateContent(newPrompt);
      const response = await result.response;
      const text = response.text();

      setResponse(text);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Magic Book Recommender</h2>
      {/* <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter comma separated genres..."
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
      /> */}

      <div className="w-full gap-2 flex flex-row">
        <div className="grow">
          <Searchbar
            value={genres}
            setValue={setGenres}
            isMulti={true}
            searchFunction={searchGenre}
          />
        </div>
        <button
          onClick={fetchRecommendation}
          className="bg-cyan-600 hover:bg-clue-500 text-white px-4 py-2 rounded-md">
          Get Recommendation
        </button>
      </div>
      {response && (
        <div className="mt-4 bg-cyan-500 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Recommendation:
          </h3>
          <p className="text-white">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Recommender;
