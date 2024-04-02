import { React } from "react";
import { Chip } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
const GenreTablet = ({ text, closeFunction }) => {
  return (
    <div className="flex flex-row " key={`${text}`}>
      <Chip variant="ghost" value={text} />
      <LockClosedIcon
        className="absolute right-0 mx-1"
        onClick={closeFunction}
      />
    </div>
  );
};

export default GenreTablet;
