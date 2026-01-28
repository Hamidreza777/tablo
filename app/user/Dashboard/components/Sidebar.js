"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({ activeTab, setActiveTab }) {
  const router = useRouter();

  const menuItems = [
    { label: "🏠 نمای کلی", key: "overview" },
    { label: "📋 لیست تمامی تابلوها", key: "allboards" },
    { label: "⏳ رزرو و خرید تابلو", key: "pendingBoards" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/auth");
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 order-last lg:order-last"> {/* ← اینجا مهم است */}
      <div
        className="
          sticky top-6 flex h-[calc(100vh-3rem)] flex-col rounded-xl 
          bg-white shadow border border-gray-200 overflow-hidden
        "
      >
        {/* هدر */}
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800 text-right">پنل مدیریت</h2>
        </div>

        {/* منو */}
        <nav className="flex-1 px-3 py-5">
          <ul className="space-y-1.5">
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`
                    group flex w-full items-center justify-end gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                    ${
                      activeTab === item.key
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <span>{item.label.split(" ").slice(1).join(" ")}</span>
                  <span
                    className={`
                      text-base transition-colors
                      ${activeTab === item.key ? "text-white" : "text-gray-500 group-hover:text-blue-600"}
                    `}
                  >
                    {item.label.split(" ")[0]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* دکمه خروج */}
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2 rounded-lg 
              bg-red-50 px-4 py-3 text-sm font-medium text-red-700 
              transition-colors hover:bg-red-100 active:bg-red-200
            "
          >
            <span className="text-base">🚪</span>
            خروج
          </button>
        </div>
      </div>
    </aside>
  );
}