"use client";

import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import api from "../../components/Services/Confgaxios";
import { UserContext } from "../../context/Context";
import List from "./List";

// Dynamic import بدون SSR برای کامپوننت نقشه
const DatadashbordNoSSR = dynamic(() => import("./Datadashbord"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

function Page() {
  const [event, setEvent] = useState("create");
  const { accessToken, setAccessToken, setUserRole } = useContext(UserContext);
  const router = useRouter();

  const generateNonce = () =>
    Math.floor(10000000 + Math.random() * 90000000).toString();

  const exitHandler = async () => {
    try {
      // اگر توکن وجود داشت → درخواست لاگ‌اوت به سرور
      if (accessToken) {
        await api.post(
          "/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              nonce: generateNonce(),
            },
            withCredentials: true,
          }
        );
      }

      // پاکسازی محلی مهم است حتی اگر درخواست شکست بخورد
      localStorage.removeItem("accessToken");
      setAccessToken?.(null);
      setUserRole?.(null);

      // ریدایرکت به صفحه احراز هویت
      router.push("/auth");
      // router.refresh();   // ← اگر لازم بود فعال کن (معمولاً در app router نیاز نیست)
    } catch (error) {
      console.error("خطا در خروج:", error);

      // مهم: حتی در صورت خطا هم کاربر را لاگ‌اوت محلی می‌کنیم
      localStorage.removeItem("accessToken");
      setAccessToken?.(null);
      setUserRole?.(null);

      router.push("/auth");

      // می‌تونی toast اضافه کنی به جای alert
      alert("خطایی در خروج رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  const menuItems = [
    { label: "ثبت تابلو", key: "create" },
    { label: "لیست تابلوها", key: "List" },
    { label: "رزرو شده", key: "reseve" },
    { label: "تایید شده", key: "accept" },
  ];

  return (
    <div dir="rtl" className="flex flex-col md:flex-row mt-16 md:mt-20 w-full gap-6 px-4 md:px-8 pb-8">
      {/* سایدبار / منو */}
      <aside className="md:w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setEvent(item.key)}
            className={`w-full text-right px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
              event === item.key
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100"
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={exitHandler}
            className="w-full px-5 py-3 rounded-lg text-red-600 font-medium transition-all duration-200 hover:bg-red-50 active:bg-red-100 flex items-center justify-start gap-2"
          >
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
        {event === "create" && <DatadashbordNoSSR />}

        {event === "List" && <List />}

        {event === "reseve" && (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg font-medium">این بخش هنوز پیاده‌سازی نشده است</p>
            <p className="text-sm mt-2">در حال توسعه...</p>
          </div>
        )}

        {event === "accept" && (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">این بخش هنوز پیاده‌سازی نشده است</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;