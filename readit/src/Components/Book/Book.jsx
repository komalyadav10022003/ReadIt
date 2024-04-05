import React from "react";
import { Card, Button, CardHeader, CardBody } from "@material-tailwind/react";

function Book({ bookCover, title, author, genre, onClick }) {
  // const bufferToBase64 = (buffer) => {
  //   let binary = "";
  //   const bytes = new Uint8Array(buffer);
  //   for (let i = 0; i < bytes.byteLength; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return window.btoa(binary);
  // };

  // const image = bookCover
  //   ? `data:image/jpeg;base64,${bufferToBase64(bookCover)}`
  //   : null;

  return (
    <div key={`${title}+${genre}`}>
      <Card className="w-64 rounded-lg overflow-hidden shadow-md font-mono">
        {bookCover ? (
          <img
            src={bookCover}
            alt={title}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
            No Image Available
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{genre}</p>
          <Button
            className="w-full bg-cyan-600 text-white"
            ripple="light"
            onClick={onClick}>
            Download
          </Button>
          <Button
            className="w-full bg-cyan-600 text-white my-1"
            ripple="light"
            onClick={onClick}>
            Read Now
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Book;
