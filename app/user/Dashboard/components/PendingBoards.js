
"use client";

import { useState } from "react";

export default function AllBoardsReservation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    phone: "",
    startDate: "",
    endDate: "",
    paymentMethod: "cash", // cash | check
    checkNumber: "",
    checkBank: "",
    checkDueDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end < start) return 0;
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // شامل روز اول و آخر
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = calculateDays();

    if (days < 1) {
      setError("تاریخ پایان باید بعد از تاریخ شروع باشد");
      return;
    }

    if (days < 30 && formData.paymentMethod === "check") {
      setError("برای کمتر از ۱ ماه فقط پرداخت نقدی ممکن است");
      setFormData((prev) => ({ ...prev, paymentMethod: "cash" }));
      return;
    }

    if (formData.paymentMethod === "check") {
      if (!formData.checkNumber || !formData.checkDueDate) {
        setError("لطفاً اطلاعات چک را کامل وارد کنید");
        return;
      }
    }

    // اینجا می‌تونی درخواست به API بفرستی
    console.log("داده‌های فرم:", formData);
    console.log("تعداد روز:", days);

    alert("رزرو با موفقیت ثبت شد! (در نسخه واقعی به سرور ارسال می‌شود)");
  };

  const days = calculateDays();
  const canUseCheck = days >= 30;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* کارت اصلی */}
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
          {/* هدر */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-10 text-white">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              رزرو تابلو تبلیغاتی
            </h1>
            <p className="mt-3 text-blue-100 text-center text-lg">
              لطفاً اطلاعات خود را با دقت وارد کنید
            </p>
          </div>

          {/* فرم */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
            {/* اطلاعات شخصی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="محمد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="رضایی"
                />
              </div>


<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  کد ملی
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono"
                  placeholder="0012345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  شماره موبایل
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="09[0-9]{9}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono"
                  placeholder="09123456789"
                />
              </div>
            </div>

            {/* بازه زمانی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ شروع
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاریخ پایان
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  min={formData.startDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* نمایش تعداد روزها */}
            {days > 0 && (
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <p className="text-lg font-medium text-blue-800">
                  مدت زمان رزرو: <span className="font-bold">{days} روز</span>
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  {days >= 30
                    ? "امکان پرداخت با چک وجود دارد"
                    : "پرداخت فقط به صورت نقدی ممکن است"}
                </p>
              </div>
            )}

            {/* انتخاب روش پرداخت */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                روش پرداخت
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center bg-gray-50 px-5 py-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-blue-50 transition flex-1">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="mr-3 text-gray-800 font-medium">نقدی</span>
                </label>



<label
  className={ `flex items-center px-5 py-4 rounded-xl border cursor-pointer transition flex-1
    ${canUseCheck 
      ? "bg-gray-50 border-gray-200 hover:bg-blue-50" 
      : "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
    }
 ` }
>
  <input
    type="radio"
    name="paymentMethod"
    value="check"
    checked={formData.paymentMethod === "check"}
    onChange={handleChange}
    disabled={!canUseCheck}
    className="w-5 h-5 text-blue-600"
  />
  <span className="mr-3 text-gray-800 font-medium">چک</span>
</label>
              </div>
            </div>

            {/* بخش اطلاعات چک - فقط وقتی چک انتخاب شده و مجاز است */}
            {formData.paymentMethod === "check" && canUseCheck && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 space-y-5 animate-fadeIn">
                <h3 className="text-lg font-semibold text-yellow-800">
                  اطلاعات چک
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      شماره چک
                    </label>
                    <input
                      type="text"
                      name="checkNumber"
                      value={formData.checkNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      placeholder="123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      نام بانک
                    </label>
                    <input
                      type="text"
                      name="checkBank"
                      value={formData.checkBank}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                      placeholder="ملی / ملت / ..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      تاریخ سررسید
                    </label>
                    <input
                      type="date"
                      name="checkDueDate"
                      value={formData.checkDueDate}
                      onChange={handleChange}
                      required
                      min={formData.endDate || new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* خطا */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-center">
                {error}
              </div>
            )}

            {/* دکمه ارسال */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              ثبت رزرو تابلو
            </button>
          </form>
        </div>


<p className="text-center text-gray-500 text-sm mt-8">
          تمامی اطلاعات محرمانه بوده و صرفاً برای رزرو استفاده می‌شود.
        </p>
      </div>
    </div>
  );
}
