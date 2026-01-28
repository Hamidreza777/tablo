"use client";

export default function UserCreator({ newUser, setNewUser, addUser }) {
  // فقط اجازه می‌ده عدد وارد بشه + حداکثر ۱۱ کاراکتر
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // فقط عدد نگه می‌داره
    if (value.length <= 11) {
      setNewUser({ ...newUser, phone: value });
    }
  };

  // (اختیاری) اگر می‌خوای با فاصله نشون بده مثلاً ۰۹۱۲ ۱۲۳ ۴۵۶۷
  const formatPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
      <h2 className="text-xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-100">
        ایجاد حساب کاربری جدید
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* فیلد شماره موبایل */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            شماره موبایل
          </label>
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            value={newUser.phone || ""} // بدون format اگر نمی‌خوای فاصله ببینی
            // value={formatPhone(newUser.phone || "")}   ← اگر فاصله می‌خوای این خط رو فعال کن
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition-all duration-200
                     hover:border-blue-400 bg-gray-50/40"
          />
        </div>

        {/* انتخاب نقش */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            نقش کاربر
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition-all duration-200
                     hover:border-blue-400 bg-gray-50/40"
            value={newUser.role || ""}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="" disabled>
              انتخاب نقش
            </option>
            <option value="manager">مدیر</option>
            <option value="user">کاربر معمولی</option>
          </select>
        </div>

        {/* فضای خالی برای چیدمان چهار ستونی */}
        <div className="hidden md:block" />

        {/* دکمه ایجاد */}
        <button
          onClick={addUser}
          disabled={!newUser.phone || newUser.phone.length < 10 || !newUser.role}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium 
                   rounded-xl hover:bg-blue-700 active:bg-blue-800 
                   focus:ring-4 focus:ring-blue-200 focus:outline-none 
                   transition-all duration-200 shadow-sm
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ایجاد حساب
        </button>
      </div>

      {/* پیام راهنما / وضعیت */}
      <div className="mt-4 text-sm text-gray-500">
        {newUser.phone && newUser.phone.length > 0 && newUser.phone.length < 11 && (
          <p>شماره باید ۱۱ رقم باشد (با صفر شروع شود)</p>
        )}
      </div>
    </div>
  );
}