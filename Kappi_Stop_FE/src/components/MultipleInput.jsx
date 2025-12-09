import React from "react";

const MultipleInput = ({
  label,
  name,
  values,
  setValues,
  register,
  errors,
  text_size = "text-sm",
  gap = "gap-x-10",
}) => {

  const handleAdd = () => {
    setValues([...values, { add_name: "", value: "" }]);
  };

  const handleChange = (index, field, fieldValue) => {
    const updated = [...values];
    updated[index][field] = fieldValue;
    setValues(updated);

    register(name).onChange({
      target: { name, value: updated },
    });
  };

  return (
    <div className={`grid grid-cols-12 items-start ${gap}`}>
      <label className={`col-span-5 ${text_size} font-medium pt-2`}>
        {label}
      </label>

      <div className="col-span-7 space-y-2">
        {values.map((row, index) => (
          <div key={index} className="flex items-center gap-2">

            <input
              value={row.add_name}
              onChange={(e) => handleChange(index, "add_name", e.target.value)}
              placeholder={`Add-on name`}
              className={`w-1/2 border border-input-bordergrey rounded-lg
                outline-none py-2 px-2 text-xs
                ${errors[name] ? "border-red-500" : ""}`}
            />

            <input
              value={row.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
              placeholder={`Value`}
              className={`w-1/2 border border-input-bordergrey rounded-lg
                outline-none py-2 px-2 text-xs
                ${errors[name] ? "border-red-500" : ""}`}
            />

            {index === values.length - 1 && (
              <button
                type="button"
                onClick={handleAdd}
                className="px-3 py-1 bg-layout-text text-white rounded"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Error */}
      {errors[name] && (
        <p className="text-red-500 text-xs col-span-12 text-end pt-1.5">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default MultipleInput;
