"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Tablo from "../../components/data/Tablo";
import Card from "../../components/mediacard/Card";

function Page() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const offset = currentPage * itemsPerPage;
  const currentItems = Tablo.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="mt-24 mb-10 px-4">
      {/* Cards */}
      <div className="max-w-7xl mx-auto">
        <Card myfilter={currentItems} />
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <ReactPaginate
          breakLabel="..."
          nextLabel="بعدی ›"
          previousLabel="‹ قبلی"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(Tablo.length / itemsPerPage)}
          containerClassName="
            flex justify-center items-center gap-2
            bg-white/70 backdrop-blur-md
            border border-blue-100
            rounded-2xl px-6 py-3
            shadow-lg shadow-blue-200/40
          "
          pageClassName="
            px-4 py-2 text-sm font-semibold
            rounded-xl cursor-pointer
            text-blue-700
            hover:bg-blue-100 hover:text-blue-900
            transition
          "
          activeClassName="
            bg-gradient-to-r from-blue-500 to-blue-600
            text-white shadow-md shadow-blue-500/40
          "
          previousClassName="
            px-4 py-2 text-sm font-semibold
            rounded-xl cursor-pointer
            text-blue-700
            hover:bg-blue-100
            transition
          "
          nextClassName="
            px-4 py-2 text-sm font-semibold
            rounded-xl cursor-pointer
            text-blue-700
            hover:bg-blue-100
            transition
          "
          disabledClassName="opacity-40 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default Page;
