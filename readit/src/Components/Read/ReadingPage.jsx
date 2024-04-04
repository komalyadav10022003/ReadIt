import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Document, Page } from "react-pdf";
import axios from "axios";
import Book from "../Book/Book";
import { saveAs } from "file-saver";
import StickyNavbar from "../Navbar/StickyNavbar";

const ReadingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pdfData, setPdfData] = useState(null);

  const [bookCover, setBookCover] = useState(null);

  const [books, setBooks] = useState([]);

  const bookDownload = async (event, filename, bookName) => {
    event.preventDefault();
    console.log(filename);
    const response = await axios.get(
      `/download/?filename=${filename}&type=file`
    );

    //save the blob data
    saveAs(
      new Blob([response.data], { type: "application/pdf" }),
      `${bookName}.pdf`
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?q=${searchQuery}&type=books`);
      setPdfData(response.data);
      console.log(response.data);

      //empty the existing array
      setBooks([]);
      response.data.map(async (elem) => {
        const newBookCover = await axios.get(
          `/download/?filename=${
            response.data[0].bookFile.split("\\")[1]
          }&type=cover`
        );

        const newBook = (
          <Book
            title={elem.title}
            author={elem.author}
            genre={elem.genre}
            bookCover={newBookCover}
            onClick={(event) => {
              bookDownload(event, elem.bookCover.split("\\")[1], elem.title);
            }}
          />
        );

        setBooks([...books, newBook]);
      });
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  return (
    <div className="gap-4">
      <StickyNavbar />
      <div className="m-2">
        <h1 className="text-2xl font-bold mb-4">Reading Page</h1>
        <div className="flex items-center space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Search for a book"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button color="blue" ripple="light" onClick={handleSearch}>
            Search
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 p-4">
          {books}
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
