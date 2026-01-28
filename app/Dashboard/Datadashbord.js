"use client";

import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { TileLayer, useMapEvents } from "react-leaflet";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import toast, { Toaster } from "react-hot-toast";
import api from "../../components/Services/Confgaxios";
import { UserContext } from "../../context/Context";

// Dynamic import برای MapContainer
const MapContainerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

function Datadashbord() {
  const { accessToken } = useContext(UserContext);
  const [center] = useState([35.8327, 50.9915]);
  const [mapCenter, setMapCenter] = useState(center);
  const [formdata, setFormdata] = useState({
    city: "",
    size: "",
    address: "",
    price: "",
    mediaType: "",
    image: null,
    rewPrice: 0,
    isActive: true,
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "price") {
      const numericValue = value.replace(/[^\d]/g, "");
      const formatted = new Intl.NumberFormat("en-US").format(numericValue);

      setFormdata((prevData) => ({
        ...prevData,
        price: formatted,
        rawPrice: numericValue,
      }));
    } else {
      setFormdata((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const generateNonce = () =>
    Math.floor(10000000 + Math.random() * 90000000).toString();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (formdata.image && formdata.image.length > 0) {
      for (let i = 0; i < formdata.image.length; i++) {
        formData.append("avatar", formdata.image[i]);
      }
    } else {
      toast.error("لطفاً حداقل یک تصویر انتخاب کنید.");
      return;
    }

    formData.append("province", formdata.province || "تهران");
    formData.append("city", formdata.city);
    formData.append("size", formdata.size);
    formData.append("address", formdata.address);
    formData.append("price", formdata.rewPrice);
    formData.append("mediatype", formdata.mediaType);
    formData.append("light", formdata.light || "دارد");
    formData.append("lat", parseFloat(mapCenter[0]));
    formData.append("lng", parseFloat(mapCenter[1]));
    formData.append("role", formdata.role || "any");
    formData.append("description", String(formdata.description || ""));
    formData.append("isActive", formdata.isActive ? "true" : "false");

    try {
      const res = await api.post("/createbilboard", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          nonce: generateNonce(),
        },
        withCredentials: true,
      });

      toast.success("تابلو با موفقیت ثبت شد");

      setFormdata({
        city: "",
        size: "",
        address: "",
        price: "",
        mediaType: "",
        image: null,
        description: "",
        isActive: true,
      });

      setMapCenter([35.8327, 50.9915]);
      document.getElementById("image_upload").value = null;
    } catch (err) {
      console.error("❌ خطا در ارسال فرم:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("خطا در ارسال اطلاعات");
      }
    }
  };

  // ردیابی حرکت نقشه
  function LocationMarker() {
    useMapEvents({
      moveend: (e) => {
        const map = e.target;
        const newCenter = map.getCenter();
        setMapCenter([newCenter.lat, newCenter.lng]);
      },
    });
    return null;
  }

  return (
    <>
      <Toaster />
      <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          ثبت اطلاعات تابلو
        </h3>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* شهر */}
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              لیست شهرها
            </label>
            <input
              type="text"
              id="city"
              onChange={handleChange}
              value={formdata.city}
              placeholder="کرج"
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            />
          </div>

          {/* ابعاد */}
          <div className="flex flex-col">
            <label
              htmlFor="size"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              ابعاد
            </label>
            <input
              type="text"
              id="size"
              onChange={handleChange}
              value={formdata.size}
              placeholder="6x2.5"
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            />
          </div>

          {/* آدرس */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="address"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              آدرس
            </label>
            <input
              type="text"
              id="address"
              onChange={handleChange}
              value={formdata.address}
              placeholder="مثال: خیابان راه آهن، نرسیده به میدان بسیج"
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            />
          </div>

          {/* قیمت */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="price"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              قیمت
            </label>
            <input
              type="text"
              id="price"
              onChange={handleChange}
              value={formdata.price}
              placeholder="مثال: 25/000/000 میلیون تومان"
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            />
          </div>

          {/* نقشه */}
          <div
            className="md:col-span-2 w-full rounded-lg shadow-md relative"
            style={{ height: "300px", zIndex: 0 }}
          >
            <MapContainerNoSSR
              center={center}
              zoom={17}
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                zIndex: 0,
              }}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainerNoSSR>

            {/* پین ثابت وسط نقشه */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
              <FaLocationDot size={30} color="red" />
            </div>
          </div>

          {/* نوع رسانه */}
          <div className="flex flex-col">
            <label
              htmlFor="mediaType"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              نوع رسانه
            </label>
            <select
              id="mediaType"
              onChange={handleChange}
              value={formdata.mediaType}
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            >
              <option value="">انتخاب کنید</option>
              <option value="استرابورد">استرابورد</option>
              <option value="بیلبورد">بیلبورد</option>
              <option value="پروژکتوری">پروژکتوری</option>
              <option value="بنر مناسبتی">بنر مناسبتی</option>
            </select>
          </div>

          {/* وضعیت تابلو */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-medium text-gray-700">
              وضعیت تابلو
            </label>
            <button
              type="button"
              onClick={() =>
                setFormdata((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
              className={`px-4 py-2 rounded-lg text-white transition-all ${
                formdata.isActive ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {formdata.isActive ? "فعال" : "غیرفعال"}
            </button>
          </div>

          {/* توضیحات */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              onChange={handleChange}
              value={formdata.description}
              rows={3}
              placeholder="توضیحات اضافی درباره موقعیت، شرایط، یا ویژگی‌های تابلو"
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            ></textarea>
          </div>

          {/* آپلود عکس */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="image_upload"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              آپلود عکس
            </label>
            <input
              type="file"
              id="image_upload"
              onChange={(e) =>
                setFormdata({ ...formdata, image: e.target.files })
              }
              accept="image/*,video/mp4"
              multiple
              required
              className="p-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 text-sm"
            />
          </div>

          {/* دکمه ثبت */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Datadashbord;
