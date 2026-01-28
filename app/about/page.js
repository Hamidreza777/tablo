import React from "react";
import Image from "next/image";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex flex-col items-center p-8 mt-20">
      <header className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          درباره ما
        </h1>
        <p dir="rtl" className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          در دنیای مدرن تبلیغات، دیده شدن در مکان مناسب می‌تواند تفاوت بزرگی در
          رشد و موفقیت کسب‌وکارها ایجاد کند. <span className="font-semibold text-blue-800">انصاف تابلو</span> با هدف تسهیل فرآیند
          رزرو آنلاین بیلبورد، راهی سریع، شفاف و کارآمد را برای برندها،
          استارتاپ‌ها و شرکت‌ها فراهم کرده است. با پلتفرم ما، می‌توانید به صدها
          موقعیت تبلیغاتی برتر در سراسر کشور دسترسی داشته باشید، قیمت‌ها را
          مقایسه کنید و در چند کلیک ساده بیلبورد خود را رزرو کنید – بدون واسطه، بدون دردسر!
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {[
          {
            img: "/img/best-billboard-design.jpg",
            text: "دسترسی به بیلبوردهای متنوع و استراتژیک",
          },
          {
            img: "/img/bilboard-takhasosi.webp",
            text: "رزرو سریع و آنلاین بدون نیاز به تماس‌های متعدد",
          },
          {
            img: "/img/bill.jpg",
            text: "شفافیت کامل در قیمت‌گذاری و اطلاعات دقیق موقعیت‌ها",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl p-8 text-center transition-transform transform hover:scale-105 hover:shadow-3xl hover:shadow-blue-300/40 duration-300"
          >
            <div className="relative w-full h-64 sm:h-72 mb-6">
              <Image
                src={item.img}
                alt=""
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <p className="text-gray-700 font-medium text-lg sm:text-xl">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default About;
