import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

function Pagination({
  goToPreviousPage,
  points,
  changePage,
  currentPage,
  goToNextPage,
}) {
  return (
      <nav
        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
        aria-label='Pagination'
      >
        <button
          type='button'
          onClick={goToPreviousPage}
          className='relative inline-flex items-center px-2 mx-2 py-2 rounded-md border border-[#d9d9d9] bg-white text-sm  text-gray-500 hover:bg-gray-50 '
        >
          <ChevronLeftIcon className=' h-5 w-5 ' aria-hidden='true' />
        </button>
        <div>
          {points?.map((number, i) => {
            return (
              <button
                key={i}
                type='button'
                onClick={number !== "..." ? changePage : () => {}}
                className={`relative inline-flex items-center px-2 mx-2 py-2 rounded-md border border-[#d9d9d9] bg-white text-sm  text-gray-500 hover:bg-gray-50 ${
                  number === currentPage ? "bg-[#1890ff] text-white" : ""
                }`}
              >
                {number}
              </button>
            );
          })}
        </div>

        <button
          type='button'
          onClick={goToNextPage}
          className='relative inline-flex items-center px-2 py-2 rounded-md border mx-2  border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 '
        >
          <span className='sr-only'>Next</span>
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </nav>
  );
}

export default Pagination;
