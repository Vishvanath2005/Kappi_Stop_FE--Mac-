import React, { useState } from 'react';

const Edit_profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='space-y-2'>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Full Name</p>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-96 py-2.5 text-black px-2 outline-0 text-md rounded-md bg-[#FFF0D3]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Email id</p>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-96 py-2 text-black px-2 outline-0 text-md rounded-md bg-[#FFF0D3]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Phone Number</p>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-96 py-2 text-black px-2 outline-0 text-md rounded-md bg-[#FFF0D3]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Gender</p>
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-96 py-2 text-black px-2 outline-0 text-md rounded-md bg-[#FFF0D3]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Date of Birth</p>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-96 py-2 text-black px-2 outline-0 text-md rounded-md bg-[#FFF0D3]"
        />
      </div>
    </div>
  );
};

export default Edit_profile;