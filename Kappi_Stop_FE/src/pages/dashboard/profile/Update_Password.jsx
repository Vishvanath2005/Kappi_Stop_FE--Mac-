import React, { useState } from 'react'

const Update_Password = () => {

 const [formData, setFormData] = useState({
    new_password: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col  space-y-5'>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">New Password</p>
        <input
          type="text"
          name="new_password"
          value={formData.new_password}
          onChange={handleChange}
          className="w-96 py-2.5 text-black px-2 outline-0 text-md drop-shadow-sm rounded-md bg-[#FFF0D3]"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Confirm new password</p>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-96 py-2.5 text-black px-2 outline-0 text-md drop-shadow-sm rounded-md bg-[#FFF0D3]"
        />
      </div>
      </div>
  )
}

export default Update_Password