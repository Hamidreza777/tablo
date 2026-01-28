"use client";
import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Tablo from "../data/Tablo";
import Card from "../mediacard/Card";

function Mydata({ filteredData, filterPrice }) {
  const getRandomItems = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomTablo = getRandomItems(Tablo, 8);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const currentItems = Tablo.slice(offset, offset + itemsPerPage);
  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="w-[95%] m-auto mt-16">
      {/* Section Header */}
      <div className="w-full flex flex-row-reverse items-center justify-between mb-6">
        <h2 className="text-right text-xl font-bold text-blue-900 w-[40%] sm:w-[20%]">
          پیشنهادی های این ماه
        </h2>
        <hr className="border-slate-400 w-[55%] sm:w-[75%] h-[2px] rounded-full" />
      </div>

      {/* Random Cards */}
      <div className="mb-10">
        <Card myfilter={randomTablo} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <ReactPaginate
          breakLabel="..."
          nextLabel="›"
          previousLabel="‹"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(Tablo.length / itemsPerPage)}
          containerClassName="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg shadow-blue-200/40"
          activeClassName="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-xl shadow-md shadow-blue-500/30"
          pageClassName="px-4 py-1 rounded-lg text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition"
          previousClassName="px-4 py-1 rounded-lg bg-gray-200 hover:bg-blue-300 cursor-pointer"
          nextClassName="px-4 py-1 rounded-lg bg-gray-200 hover:bg-blue-300 cursor-pointer"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>

      {/* Filtered Price Cards */}
      <div className="mt-10">
        <Card
          myfilter={filterPrice && Array.isArray(filterPrice) ? filterPrice : []}
        />
      </div>
    </div>
  );
}

export default Mydata;
