import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Document, Page } from "react-pdf";
import axios from "axios";
import Book from "../Book/Book";
import { saveAs } from "file-saver";
import StickyNavbar from "../Navbar/StickyNavbar";
import Recommender from "../Recommender/Recommender";

const ReadingPage = () => {
  //demo data
  const dummyBooks = [
    {
      coverUrl: "https://cdn.thestorygraph.com/uyda3dzvjz2q12zu9ca8o5z52aee",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
    },
    {
      coverUrl: "https://cdn.thestorygraph.com/nb76a3bdevkvca4csof6hb7lbeqj",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic",
    },
    {
      coverUrl: "https://cdn.thestorygraph.com/jztibk5xvnynw7mh7hfw0orhbzuh",
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
    },
    {
      coverUrl: "https://cdn.thestorygraph.com/ohr6jiemvmagos6wad5oah75t4d9",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
    },
    {
      coverUrl: "https://cdn.thestorygraph.com/jztibk5xvnynw7mh7hfw0orhbzuh",
      title: "Animal Farm",
      author: "George Orwell",
      genre: "Classic",
    },
    // Add more books as needed
  ];

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
    let newBooks = [];
    try {
      const response = await axios.get(`/search?q=${searchQuery}&type=books`);
      setPdfData(response.data);
      console.log(response.data);

      //empty the existing array
      //   setBooks([]);

      dummyBooks.map(async (elem) => {
        // const newBookCover = await axios.get(
        //   `/download/?filename=${
        //     response.data[0].bookFile.split("\\")[1]
        //   }&type=cover`
        // );

        const newBook = (
          <Book
            title={elem.title}
            author={elem.author}
            genre={elem.genre}
            bookCover={elem.coverUrl}
            onClick={(event) => {
              //   bookDownload(event, elem.bookCover.split("\\")[1], elem.title);
              console.log(event);
            }}
          />
        );
        newBooks.push(newBook);
      });
      setBooks(newBooks);
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
        <Recommender />
      </div>
    </div>
  );
};

export default ReadingPage;
