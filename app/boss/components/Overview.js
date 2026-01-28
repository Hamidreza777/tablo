"use client";

export default function Overview({ users }) {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.active).length;
  const managers = users.filter((u) => u.role === "manager").length;
  const activeManagers = users.filter(
    (u) => u.role === "manager" && u.active,
  ).length;

  return (
    <div className="space-y-8">
      {/* هدر ساده و شیک */}

      <div>
        <h2 className="text-2xl font-bold text-blue-800 tracking-tight">
          نمای کلی سیستم
        </h2>
        <p className="text-blue-600/80 mt-1 text-sm">
          آخرین به‌روزرسانی: چند دقیقه پیش
        </p>
      </div>

      {/* کارت‌ها با طراحی شیشه‌ای/مینیمال */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* کارت ۱ */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-300" />
          <div className="p-6">
            <p className="text-sm font-medium text-blue-600/80 uppercase tracking-wide">
              کل کاربران
            </p>
            <p className="text-4xl font-bold text-blue-900 mt-3">
              {totalUsers.toLocaleString("fa-IR")}
            </p>
            <p className="text-sm text-blue-600/70 mt-4">
              {activeUsers} نفر فعال
            </p>
          </div>
        </div>

        {/* کارت ۲ */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-300" />
          <div className="p-6">
            <p className="text-sm font-medium text-indigo-600/80 uppercase tracking-wide">
              مدیران
            </p>
            <p className="text-4xl font-bold text-indigo-900 mt-3">
              {managers.toLocaleString("fa-IR")}
            </p>
            <p className="text-sm text-indigo-600/70 mt-4">
              {activeManagers} نفر فعال
            </p>
          </div>
        </div>

        {/* کارت ۳ */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400" />
          <div className="p-6">
            <p className="text-sm font-medium text-blue-600/80 uppercase tracking-wide">
              کاربران فعال
            </p>
            <p className="text-4xl font-bold text-blue-900 mt-3">
              {activeUsers.toLocaleString("fa-IR")}
            </p>
            <p className="text-sm text-blue-600/70 mt-4">
              {Math.round((activeUsers / totalUsers) * 100 || 0)}% کل
            </p>
          </div>
        </div>

        {/* کارت ۴ - وضعیت */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-300" />
          <div className="p-6">
            <p className="text-sm font-medium text-emerald-600/80 uppercase tracking-wide">
              وضعیت سیستم
            </p>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-4xl font-bold text-emerald-700">
                Online
              </span>
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-sm text-blue-600/70 mt-4">بدون اختلال</p>
          </div>
        </div>
      </div>
    </div>
  );
}
