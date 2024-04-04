import React from "react";
import { Document, Page } from "react-pdf";

function FileViewer({ file, setFile }) {
  console.log(file["name"]);
  return (
    <div className="m-2 flex flex-row justify-center items-center border text-blue-500 rounded-lg cursor-pointer h-max-60">
      <img
        src={file}
        alt=""
        className="h-96 w-full m-auto rounded object-fit"
        onClick={() => setFile(null)}
      />
    </div>
  );
}

export default FileViewer;
