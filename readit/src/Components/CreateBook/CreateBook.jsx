import React from "react";
import { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/async-creatable";
import PDFViewer from "./PDFViewer";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import StickyNavbar from "../Navbar/StickyNavbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FileInput from "./FileInput";
import FileViewer from "./FileViewer";
import Searchbar from "../Searchbar/Searchbar";

//search book
const searchBook = async (searchValue) => {
  // event.preventDefault();
  console.log(searchValue);
  const results = await fetch(`/search?q=${searchValue}&type=books`)
    .then((res) => res.json())
    .then((json) => json);

  const returnResults = results.map((elem) => ({ name: elem.title }));

  return returnResults;
};

//search genre
// const searchGenre = async (event) => {
//   event.preventDefault();
//   console.log(event.target.value);
//   await fetch(`/search?q=${event.target.value}&type=genre`)
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//     });
// };

const CreateBook = () => {
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");

  //actually useful
  const [genreArray, setGenreArray] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [bookCover, setBookCover] = useState(null);
  const [selectedBook, setSelectedBook] = useState();

  const searchGenre = async (searchValue) => {
    const results = await fetch(`/search?q=${searchValue}&type=genre`)
      .then((res) => res.json())
      .then((json) => json);

    return results;
  };

  const handleFormSubmit = async (event, type) => {
    const formData = new FormData();
    let route = "";
    if (type !== "create") {
      let book = await fetch(`/search?q=${selectedBook.value}&type=books`)
        .then((res) => res.json())
        .then((json) => json);

      console.log("BOOK ", book);
      formData.append("bookFile", bookFile);
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("genre", book.genre);
      route = "existing";
    }

    //user chooses to create a book file
    else {
      console.log(bookTitle);
      console.log(bookAuthor);
      console.log(bookFile);
      console.log(selectedGenre);

      const data = {
        title: bookTitle,
        author: bookAuthor,
        // coverFile: bookCover,
        // bookFile: bookFile,
        genre: selectedGenre.map((elem) => elem.value),
      };

      formData.append("bookFile", bookFile);
      formData.append("bookCover", bookCover);
      formData.append("title", bookTitle);
      formData.append("author", bookAuthor);
      formData.append(
        "genre",
        selectedGenre.map((elem) => elem.value)
      );

      route = "create";
    }

    try {
      const res = await axios.post(route, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <>
      <StickyNavbar />
      <div className="container flex flex-row p-2 min-w-full min-h-full align-middle justify-center overflow-scroll no-scrollbar">
        <Card className="w-1/3 border border-cyan-600 mt-4">
          <CardBody>
            <Tabs value={type} className="overflow-scroll no-scrollbar">
              <TabsHeader className="relative z-0 bg-cyan-600">
                <Tab value="card" onClick={() => setType("card")}>
                  Create a Entry
                </Tab>
                <Tab value="paypal" onClick={() => setType("paypal")}>
                  For Existing Book
                </Tab>
              </TabsHeader>
              <TabsBody
                className="!overflow-x-hidden !overflow-y-visible"
                animate={{
                  initial: {
                    x: type === "card" ? 400 : -400,
                  },
                  mount: {
                    x: 0,
                  },
                  unmount: {
                    x: type === "card" ? 400 : -400,
                  },
                }}>
                <TabPanel value="card" className="p-0">
                  <form className="mt-12 flex flex-col gap-4">
                    <div className="my-3">
                      <div className="my-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium ">
                          Title
                        </Typography>

                        <Input
                          placeholder="Title"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          onChange={(event) => setBookTitle(event.target.value)}
                          value={bookTitle}
                          required
                        />
                      </div>

                      <div className="my-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium">
                          Author
                        </Typography>
                        <Input
                          placeholder="Author"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          onChange={(event) =>
                            setBookAuthor(event.target.value)
                          }
                          value={bookAuthor}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium">
                          Genres
                        </Typography>
                        <div>
                          {/* <Input
                            type="email"
                            placeholder="Search Genre"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                            icon={
                              <MagnifyingGlassIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                            }
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                            onChange={searchGenre}
                          /> */}
                          <Searchbar
                            searchFunction={searchGenre}
                            value={selectedGenre}
                            setValue={setSelectedGenre}
                            isMulti={true}
                            required
                          />
                        </div>
                        {/* <div>{genreArray}</div> */}
                      </div>
                    </div>
                    <div className="m-1 rounded">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium">
                        Upload Cover
                      </Typography>

                      <input
                        className="block w-full cursor-pointer bg-gray-50 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg p-2 m-1 file:rounded-md file:bg-cyan-600 file:hover:bg-cyan-500 file:text-white"
                        accept="image/png, image/jpg"
                        type="file"
                        required
                        onChange={(event) => {
                          // event.preventDefault();
                          setBookCover(event.target.files[0]);
                        }}
                      />
                    </div>
                    <div className="my-1 rounded">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium">
                        Upload File
                      </Typography>
                      <input
                        className="block w-full cursor-pointer bg-gray-50 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg p-2 m-1 file:rounded-md file:bg-cyan-600 file:hover:bg-cyan-500 file:text-white"
                        accept="application/pdf"
                        type="file"
                        required
                        onChange={(event) => {
                          // event.preventDefault();
                          setBookFile(event.target.files[0]);
                        }}
                      />
                    </div>
                    <Button
                      size="lg bg-cyan-600 text-white"
                      onClick={(event) => handleFormSubmit(event, "create")}>
                      Create Book!
                    </Button>
                  </form>
                </TabPanel>
                {/**Second panel */}
                <TabPanel value="paypal" className="p-0">
                  <form className="mt-12 flex flex-col gap-4 no-scrollbar overflow-hidden">
                    <div className="my-3">
                      <div className="flex flex-col gap-1">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium">
                          Book Name
                        </Typography>
                        <div>
                          <Searchbar
                            searchFunction={searchBook}
                            value={selectedBook}
                            setValue={setSelectedBook}
                            isMulti={false}
                            required
                          />
                        </div>
                        {/* <div>{genreArray}</div> */}
                      </div>
                    </div>
                    <div className="my-2 rounded">
                      <input
                        className="block w-full cursor-pointer bg-gray-50 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-lg p-2 m-1 file:rounded-md file:bg-cyan-600 file:hover:bg-cyan-500 file:text-white"
                        accept="application/pdf"
                        type="file"
                        required
                        onChange={(event) => {
                          // event.preventDefault();
                          setBookFile(event.target.files[0]);
                        }}
                      />
                    </div>
                    <Button
                      size="lg bg-cyan-600 text-white"
                      onClick={(event) => handleFormSubmit(event, "existing")}>
                      Upload File
                    </Button>
                  </form>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CreateBook;
