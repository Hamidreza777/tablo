"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({ activeTab, setActiveTab }) {
  const router = useRouter();

  const menuItems = [
    { label: "🏠 Overview", key: "overview" },
    { label: "👥 ساخت اکانت", key: "createUser" },
    { label: "📊 نظارت", key: "monitoring" },
    { label: "📋 لیست تمامی تابلو ها", key: "allboards" },
    { label: "✅ تابلوهای تایید شده", key: "approvedBoards" },
    { label: "⏳ تابلوهای رزرو شده", key: "pendingBoards" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth");
  };

  return (
    <aside className="w-72 shrink-0">
      <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden">
        {/* هدر */}
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800 text-right">
            پنل مدیریت
          </h2>
        </div>

        {/* منو */}
        <nav dir="ltr" className="flex-1 px-3 py-6">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`
                    group relative flex w-full items-center justify-end gap-3 rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-200 text-right
                    ${
                      activeTab === item.key
                        ? "bg-gradient-to-l from-blue-600 to-blue-700 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* متن اول، بعد آیکون */}
                    <span>{item.label.split(" ").slice(1).join(" ")}</span>
                    <span className="text-xl opacity-90">
                      {item.label.split(" ")[0]}
                    </span>
                  </div>

                  {/* خط نشانه‌گر سمت راست برای آیتم فعال */}
                  {activeTab === item.key && (
                    <div className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l bg-white opacity-40" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* دکمه خروج */}
        <div className="mt-auto border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2.5 rounded-xl 
              bg-red-50/80 px-5 py-3.5 text-sm font-medium text-red-700 
              transition-all hover:bg-red-100 hover:text-red-800 active:bg-red-200
            "
          >
            <span className="text-lg">🚪</span>
            <span>خروج از حساب</span>
          </button>
        </div>
      </div>
    </aside>
  );
}