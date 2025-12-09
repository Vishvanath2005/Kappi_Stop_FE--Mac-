import React, { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

const MultiSelect = ({ options = [], placeholder = "Select", onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (option) => {
    let newSelected;

    if (selected.includes(option.value)) {
      newSelected = selected.filter((val) => val !== option.value);
    } else {
      newSelected = [...selected, option.value];
    }

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Input Box */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`border border-input-bordergrey rounded-lg px-3 py-2 text-xs flex justify-between items-center cursor-pointer
        ${error ? "border-red-500" : ""}`}
      >
        <span className="text-gray-600">
          {selected.length > 0
            ? `${selected.length} selected`
            : placeholder || "Select"}
        </span>
        <IoChevronDown />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md z-40 max-h-60 overflow-y-auto">
          {/* Search Box */}
          <div className="p-2">
            <input
              className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Options */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 && (
              <li className="text-xs text-gray-500 p-2">No results found</li>
            )}

            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="flex items-center gap-2 px-3 py-2 text-xs cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  readOnly
                />
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default MultiSelect;
