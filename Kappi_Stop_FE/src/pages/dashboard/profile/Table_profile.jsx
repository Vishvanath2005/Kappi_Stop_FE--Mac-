import React from "react";

const Table_profile = ({ headings = [], data = [] }) => {
  return (
    <div className="overflow-auto no-scrollbar">
      <table className="min-w-full border-separate border-spacing-y-2 ">
        <thead>
          <tr className="drop-shadow-sm ">
            <th className="text-left pl-5  font-semibold text-sm rounded-l-lg bg-white">
              S.no
            </th>
            {headings.map((heading, i) => (
              <th
                key={i}
                className={`p-5 text-sm font-semibold  bg-white ${
                  i === headings.length - 1 ? "rounded-r-lg" : ""
                }`}
              >
                <span className="flex items-center text-sm justify-center gap-1 select-none">
                  {heading.label}
                  <span className="text-xs">↑↓</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="bg-white rounded-lg text-sm text-gray-400 drop-shadow-sm"
              >
                <td className="p-3 text-center  font-normal rounded-l-lg">
                  {index + 1}
                </td>
                {headings.map((heading, i) => (
                  <td
                    key={i}
                    className={`p-3 text-center  font-normal ${
                      i === headings.length - 1 ? "rounded-r-lg" : ""
                    }`}
                  >
                    {row[heading.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headings.length + 1}
                className="p-4 text-center text-gray-400 font-normal"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table_profile;