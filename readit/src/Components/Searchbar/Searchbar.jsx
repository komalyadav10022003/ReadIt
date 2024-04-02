import Select from "react-select";
import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

function Searchbar({ searchFunction, value, setValue }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  //   const [value, setValue] = useState();

  const handleCreate = async (inputValue) => {
    // setIsLoading(true);
    // const searchResults = await searchFunction(inputValue);
    // console.log(searchResults);
    // let newOptions = searchResults.map((elem) => ({
    //   label: elem.name,
    //   name: elem.name,
    // }));

    // console.log(newOptions);
    // setOptions(newOptions);
    // setIsLoading(false);
    // //   setOptions((prev) => [...prev, newOption]);
    // console.log(value);

    return options;
  };

  const fetchOptions = async (newValue) => {
    const searchResults = await searchFunction(newValue);
    const newOptions = searchResults.map((elem) => ({
      label: elem.name,
      value: elem.name,
    }));

    setOptions(newOptions);
  };

  const onInputChange = async (newValue, { action, prevInputValue }) => {
    if (action === "select-option") {
      setValue([...prevInputValue, newValue]);
      console.log(value);
    } else {
      console.log(newValue);
      const results = await searchFunction(newValue);
      const newOptions = results.map((elem) => ({
        label: elem.name,
        value: elem.name,
      }));
      console.log("New Options ", newOptions);
      setOptions(newOptions);
    }
  };

  return (
    <AsyncCreatableSelect
      isClearable
      isMulti
      loadOptions={handleCreate}
      onInputChange={onInputChange}
    />
  );
}

export default Searchbar;
