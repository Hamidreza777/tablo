"use client";

import Card from "./Card"; // فرض می‌کنیم Card کامپوننت جداگانه داری

export default function Overview({ users }) {
  const totalUsers = users.length;
  const activeManagers = users.filter((u) => u.role === "manager").length;

  const stats = [
    {
      title: "کل کاربران",
      value: totalUsers,
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      title: "مدیران فعال",
      value: activeManagers,
      icon: "🧑‍💼",
      color: "from-indigo-500 to-indigo-600",
      textColor: "text-indigo-600",
    },
    {
      title: "وضعیت سیستم",
      value: "Online",
      icon: "🟢",
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      isStatus: true,
    },
  ];

  return (
    <div className="space-y-8 mb-10">
      {/* عنوان بخش */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">نمای کلی سیستم</h2>
        <p className="text-gray-500 mt-1">آمار لحظه‌ای و وضعیت کلی</p>
      </div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`
              relative overflow-hidden rounded-2xl border border-gray-200/70
              bg-gradient-to-br ${stat.color} p-6 shadow-sm
              hover:shadow-lg hover:scale-[1.02] transition-all duration-300
              group
            `}
          >
            {/* پس‌زمینه دکوراتیو */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-xl group-hover:bg-white/20 transition-all" />

            <div className="relative flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-4xl opacity-90">{stat.icon}</span>
                {stat.isStatus && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    فعال
                  </span>
                )}
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-white/90">{stat.title}</p>
                <p
                  className={`mt-1 text-3xl font-bold tracking-tight text-white`}
                >
                  {stat.value.toLocaleString("fa-IR")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}