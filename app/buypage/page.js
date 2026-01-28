"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";

function Shop({ display, detail }) {
  useEffect(() => {
    console.log(detail);
  }, []);

  return (
    <>
      {
        <div
          dir="rtl"
          className={`mt-40 ${display} flex-row justify-center items-start flex-wrap gap-6`}
        >
          {/* Cart Items */}
          <div className="lg:w-[50%] h-[220px] bg-white border border-gray-200 rounded-2xl shadow-lg shadow-blue-200/40 flex flex-col">
            <h1 className="font-bold text-[18px] px-6 py-4 border-b border-gray-100 text-blue-900">
              🛒 سبد خرید شما
            </h1>

            <div className="flex flex-row items-center gap-4 px-6 py-4">
              <Image
                className="size-28 rounded-xl object-cover shadow-md"
                alt="buy"
                src="/img/pic24.jpg"
                width="250"
                height="250"
              />

              <div className="flex flex-col gap-2">
                <p className="text-[15px] text-gray-700 leading-6">
                  بلوار شهید بهشتی، نرسیده به میدان شهرداری
                </p>
                <h2 className="text-green-600 font-semibold text-sm">
                  {""}
                </h2>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="sm:w-full lg:w-[40%] lg:max-w-md">
            <div
              dir="rtl"
              className="bg-gradient-to-b from-blue-900 to-blue-800
              border border-blue-700 p-6 rounded-2xl shadow-xl shadow-blue-900/40"
            >
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-blue-700/50"
                >
                  <li className="py-4">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-100">
                          قیمت کالاها
                        </p>
                      </div>
                      <div className="text-base font-semibold text-white">
                        {""}
                      </div>
                    </div>
                  </li>

                  <li className="py-4">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-100">
                          جمع سبد خرید
                        </p>
                      </div>
                      <div className="text-base font-semibold text-white">
                        295,000
                      </div>
                    </div>
                  </li>

                  <li className="py-4">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-green-400">
                          سود شما از خرید
                        </p>
                      </div>
                      <div className="text-base font-semibold text-green-400">
                        45,000
                      </div>
                    </div>
                  </li>

                  <li className="pt-6 flex justify-center">
                    <button
                      type="button"
                      className="w-full text-white
                      bg-gradient-to-r from-blue-500 to-blue-600
                      hover:from-blue-400 hover:to-blue-500
                      focus:ring-4 focus:outline-none focus:ring-blue-300
                      font-bold rounded-xl text-sm px-6 py-3
                      shadow-lg shadow-blue-500/30 transition"
                    >
                      ثبت سفارش
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Shop;
