"use client";

import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";

function CallUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row justify-center px-5 pb-16 bg-gradient-to-b from-blue-50 via-white to-blue-50"
    >
      {/* فرم تماس */}
      <div className="w-full sm:w-[50%] md:w-[70%] lg:w-[50%] overflow-hidden flex flex-col rounded-3xl items-center md:items-start justify-around bg-gradient-to-br from-blue-100 to-blue-200 shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-300/50">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="sm:flex sm:flex-row sm:w-full gap-6">
            <div className="flex flex-col w-full">
              <label className="text-sm text-blue-900 font-semibold mb-1">
                نام:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-xl px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-blue-900 font-semibold mb-1">
                نام خانوادگی:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-xl px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="sm:flex sm:flex-row sm:w-full gap-6">
            <div className="flex flex-col w-full">
              <label className="text-sm text-blue-900 font-semibold mb-1">
                آدرس:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="rounded-xl px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-blue-900 font-semibold mb-1">
                ایمیل:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm text-blue-900 font-semibold mb-1 block">
              پیام:
            </label>
            <textarea
              placeholder="متن خود را وارد کنید"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-[160px] rounded-xl px-4 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm resize-none"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              ثبت
            </button>
          </div>
        </form>
      </div>

      {/* اطلاعات تماس */}
      <div className="md:mr-12 mt-10 md:mt-0 space-y-6 w-full sm:w-[40%]">
        <ul className="space-y-6">
          {[
            {
              icon: <FaPhone className="w-[25px] h-[25px]" />,
              title: "تلفن تماس:",
              info: "0992068721",
            },
            {
              icon: <IoLocationSharp className="w-[30px] h-[30px]" />,
              title: "آدرس:",
              info: "البرز - کرج - عظیمیه",
            },
            {
              icon: <TfiEmail className="w-[25px] h-[25px]" />,
              title: "ایمیل:",
              info: "ensafanTablo@gmal.com",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="bg-white dark:bg-gray-800 border border-blue-200 shadow-md p-5 rounded-2xl flex items-center gap-4 hover:shadow-xl transition-shadow duration-300"
            >
              <span className="bg-blue-600 text-white w-[55px] h-[55px] flex justify-center items-center rounded-full text-xl">
                {item.icon}
              </span>
              <div>
                <div className="text-blue-900 dark:text-white font-semibold">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {item.info}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CallUs;
