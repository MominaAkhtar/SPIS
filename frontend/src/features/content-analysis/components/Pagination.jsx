import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 907,
  totalResults = '18,132',
  rowsPerPage = 20,
  onPageChange,
  onRowsPerPageChange,
}) {
  const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);
  const rowsRef = useRef(null);

  const rowOptions = [10, 20, 50, 100];

  useEffect(() => {
    function handleClickOutside(event) {
      if (rowsRef.current && !rowsRef.current.contains(event.target)) {
        setIsRowsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 select-none text-xs text-[#8A94A6]">
      {/* Left: Summary text */}
      <div className="order-2 sm:order-1">
        Showing{' '}
        <span className="text-white font-medium">
          {(currentPage - 1) * rowsPerPage + 1}
        </span>{' '}
        to{' '}
        <span className="text-white font-medium">
          {Math.min(currentPage * rowsPerPage, 18132)}
        </span>{' '}
        of <span className="text-white font-medium">{totalResults}</span> results
      </div>

      {/* Center: Pagination Buttons */}
      <div className="order-1 sm:order-2 flex items-center gap-1.5">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Previous page"
          className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1E2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#152033] hover:border-[#2A3B57] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page 1 */}
        <button
          type="button"
          onClick={() => onPageChange?.(1)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border ${
            currentPage === 1
              ? 'bg-[#00BFA5]/15 border-[#00BFA5] text-[#00BFA5]'
              : 'bg-[#111827] border-[#1E2638] text-[#8A94A6] hover:text-white hover:bg-[#152033]'
          }`}
        >
          1
        </button>

        {/* Page 2 */}
        <button
          type="button"
          onClick={() => onPageChange?.(2)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border ${
            currentPage === 2
              ? 'bg-[#00BFA5]/15 border-[#00BFA5] text-[#00BFA5]'
              : 'bg-[#111827] border-[#1E2638] text-[#8A94A6] hover:text-white hover:bg-[#152033]'
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          type="button"
          onClick={() => onPageChange?.(3)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border ${
            currentPage === 3
              ? 'bg-[#00BFA5]/15 border-[#00BFA5] text-[#00BFA5]'
              : 'bg-[#111827] border-[#1E2638] text-[#8A94A6] hover:text-white hover:bg-[#152033]'
          }`}
        >
          3
        </button>

        {/* Ellipsis */}
        <span className="px-1 text-[#8A94A6]">...</span>

        {/* Last Page (907) */}
        <button
          type="button"
          onClick={() => onPageChange?.(totalPages)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors border ${
            currentPage === totalPages
              ? 'bg-[#00BFA5]/15 border-[#00BFA5] text-[#00BFA5]'
              : 'bg-[#111827] border-[#1E2638] text-[#8A94A6] hover:text-white hover:bg-[#152033]'
          }`}
        >
          {totalPages}
        </button>

        {/* Next */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Next page"
          className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1E2638] flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#152033] hover:border-[#2A3B57] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Rows per page */}
      <div className="order-3 flex items-center gap-2" ref={rowsRef}>
        <span>Rows per page:</span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
            className="flex h-7 items-center gap-1 px-2.5 rounded-lg bg-[#111827] border border-[#1E2638] hover:border-[#2A3B57] text-white text-xs font-semibold"
          >
            <span>{rowsPerPage}</span>
            <ChevronDown className="w-3 h-3 text-[#8A94A6]" />
          </button>

          {isRowsDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-1 w-16 rounded-xl bg-[#111827] border border-[#23354E] shadow-[0_12px_32px_rgba(0,0,0,0.85)] z-50 p-1">
              {rowOptions.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    onRowsPerPageChange?.(num);
                    setIsRowsDropdownOpen(false);
                  }}
                  className={`w-full py-1 text-center text-xs rounded transition-colors ${
                    rowsPerPage === num
                      ? 'bg-[#00BFA5]/15 text-[#00BFA5] font-bold'
                      : 'text-slate-300 hover:bg-[#152033] hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
