import React from "react";
const Title = ({ title, page_title, active_title }) => {
  return (
    <div>
      <div className="font-roboto-flex flex flex-col ">
        <p className=" font-light">
          {title}

          {active_title && ` / ${active_title}`}
        </p>
        <p className="text-xl  font-semibold ">
          {page_title} {active_title}
        </p>
      </div>
    </div>
  );
};

export default Title;
