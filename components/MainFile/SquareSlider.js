"use client";

import { GiTallBridge } from "react-icons/gi";
import { TfiBlackboard } from "react-icons/tfi";
import { BsFillMotherboardFill } from "react-icons/bs";
import { GiBusStop } from "react-icons/gi";
import { PiTelevisionLight } from "react-icons/pi";
import { BsShop } from "react-icons/bs";
import { RiOilLine } from "react-icons/ri";
import { BiBus } from "react-icons/bi";
import { RiArtboardLine } from "react-icons/ri";
import { BiChalkboard } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const SquareSlider = () => {
  const slides = [
    { id: 2, icon: <TfiBlackboard />, title: "بیلبورد" },
    { id: 1, icon: <GiTallBridge />, title: "عرشه پل" },
    { id: 3, icon: <BiChalkboard />, title: "استرابورد" },
    { id: 4, icon: <BsFillMotherboardFill />, title: "لمپوست" },
    { id: 5, icon: <GiBusStop />, title: "ایستگاه اتوبوس" },
    { id: 6, icon: <PiTelevisionLight />, title: "تلویزیون شهری" },
    { id: 7, icon: <BsShop />, title: "کیوسک مطبوعاتی" },
    { id: 9, icon: <BiBus />, title: "بدنه حمل و نقل عمومی" },
    { id: 10, icon: <RiArtboardLine />, title: "بیلبورد سه وجهی" },
    { id: 8, icon: <RiOilLine />, title: "پمپ بنزین" },
  ];

  return (
    <div
      dir="rtl"
      className="w-[85%] mt-12 mb-10 mx-auto relative"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 3.5, spaceBetween: 14 },
          920: { slidesPerView: 4.5, spaceBetween: 16 },
        }}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={`/medias/${slide.title}`}>
              <div
                className="
                w-[200px] h-[200px] m-auto
                rounded-2xl
                bg-gradient-to-br from-blue-50 to-blue-100
                border border-blue-200
                shadow-xl shadow-blue-200/40
                flex flex-col items-center justify-center
                transition-all duration-300
                hover:-translate-y-2 hover:shadow-blue-400/50
                group
                "
              >
                <div
                  className="
                  text-blue-700 text-[88px] mb-2
                  transition-all duration-300
                  group-hover:scale-110 group-hover:text-blue-600
                  "
                >
                  {slide.icon}
                </div>

                <h1
                  className="
                  text-gray-800 text-lg font-bold
                  group-hover:text-blue-700 transition
                  "
                >
                  {slide.title}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className="
        custom-next
        absolute top-1/2 -left-14 -translate-y-1/2
        w-12 h-12 rounded-full
        bg-white shadow-lg shadow-blue-300/40
        text-blue-700 text-2xl
        hover:bg-blue-600 hover:text-white
        transition
        "
      >
        ❯
      </button>

      <button
        className="
        custom-prev
        absolute top-1/2 -right-14 -translate-y-1/2
        w-12 h-12 rounded-full
        bg-white shadow-lg shadow-blue-300/40
        text-blue-700 text-2xl
        hover:bg-blue-600 hover:text-white
        transition
        "
      >
        ❮
      </button>
    </div>
  );
};

export default SquareSlider;
