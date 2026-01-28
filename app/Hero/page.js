"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 py-20 md:py-32 gap-10">
        
        {/* متن */}
        <div className="flex-1 text-center md:text-right space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 dark:text-white leading-tight">
            رزرو بیلبورد و تابلو تبلیغاتی آسان و سریع
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            بهترین مکان‌ها برای تبلیغات شما، با مدیریت ساده و قیمت مناسب.
          </p>
          <Link
            href="/medias/بیلبورد"
            className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            شروع کنید
          </Link>
        </div>

        {/* تصویر */}
        <div className="flex-1 relative w-full max-w-lg">
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-xl shadow-blue-200/50">
            <Image
              src="/img/pic10.jpg"
              alt="بیلبورد تبلیغاتی"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* شکل های تزئینی */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full opacity-50 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-40 blur-3xl animate-blob animation-delay-2000"></div>
    </section>
  );
}
