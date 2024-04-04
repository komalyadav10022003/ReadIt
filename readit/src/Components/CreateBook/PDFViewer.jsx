import React, { useState } from "react";
import { ImCross } from "react-icons/im";

function PDFViewer({ file, setFile }) {
  console.log("FILE", file);

  return (
    <div className="m-2 grid grid-rows-1 grid-cols-3 justify-center items-center border bg-cyan-500 text-white rounded-lg cursor-pointer h-max-60 p-2">
      <h1 className="left-0 col-span-2">PDF FILE UPLOADED</h1>
      <div className="align-right">
        <ImCross
          onClick={(event) => {
            event.preventDefault();
            setFile(null);
          }}
          className="float-right text-white right-0 top-0 m-1"
        />
      </div>
    </div>
  );
}

export default PDFViewer;
