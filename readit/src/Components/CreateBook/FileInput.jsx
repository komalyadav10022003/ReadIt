import React, { useState, useRef } from "react";
import { LuUploadCloud } from "react-icons/lu";
import FileViewer from "./FileViewer";

function FileInput({ file, setFile, fileIndex }) {
  const [dragActive, setDragActive] = useState(false);

  //handle the drag and drop functionality

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragStart = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };
  const handleDrop = async (event) => {
    event.preventDefault();

    console.log(event);
    const { files } = await event.dataTransfer;

    console.log(files);

    if (files && files.length) {
      setFile(URL.createObjectURL(files[fileIndex]));
    }

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    }
    if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const invalidHandler = (event) => {
    console.log("Invalid input");
  };

  const handleInputChange = async (event) => {
    event.preventDefault();
    const file = await event.target.files[fileIndex];
    if (file) setFile(URL.createObjectURL(event.target.files[fileIndex]));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      type="file"
      className="p-4 m-2 flex flex-col items-center bg-blue-100 border border-dotted border-blue-600 text-blue-500 rounded-lg hover:bg-blue-200 cursor-pointer h-32"
      onClick={() => document.querySelector("#fileSelector").click()}>
      {!file && (
        <>
          <LuUploadCloud className="w-12 h-12 text-3xl" />
          <span className="text-center font-sans">
            <p className="font-bold text-l">Drag and Drop file or Browse</p>
            <p className="text-blue-400 font-light">
              Upload png, jpg, or pdf with file size not exceeding 10mb
            </p>
          </span>
          <input
            type="file"
            id="fileSelector"
            className="hidden"
            accept="image/png, image/jpg, .pdf"
            size={10 * 1024 * 1024}
            onChange={handleInputChange}
            required={true}
          />
        </>
      )}
      {/* {file && <FileViewer file={file} />} */}
    </div>
  );
}

export default FileInput;
