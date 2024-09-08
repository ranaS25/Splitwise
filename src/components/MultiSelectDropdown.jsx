import React, { useState } from "react";

const MultiSelectDropdown = ({ options, selectedItems, setSelectedItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item) => {
    // Check if the item is already selected
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setSearchTerm(""); // Clear search term after selection
    setShowOptions(false); // Hide dropdown after selection
  };

  const handleRemove = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowOptions(true); // Show options when typing
  };

  const handleInputClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div>
      <div
        onClick={handleInputClick}
        className=" flex flex-col gap-2 border border-gray-300 p-1 rounded relative"
      >
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <span
              key={item}
              className="border  bg-slate-400 border-gray-300 rounded-xl p-2  inline-flex items-center"
            >
              {item}
              <button
                onClick={() => handleRemove(item)}
                className="flex items-center ml-1 text-white font-serif font-lighter hover:bg-slate-600 px-2 rounded-full  border-none bg-slate-500 cursor-pointer"
              >
                x
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Friends"
          className="outline-none rounded p-2 grow"
        />
        {showOptions && (
          <ul className="border border-gray-300 rounded absolute top-full left-0 w-full max-h-[200px] overflow-y-auto bg-white z-10">
            {filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                style={{ padding: "8px", cursor: "pointer" }}
                className="hover:bg-black/10  "
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
