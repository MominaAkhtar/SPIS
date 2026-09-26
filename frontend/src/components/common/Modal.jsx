import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
