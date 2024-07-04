// src/components/ProgressBar.js
import React from 'react';

const ProgressBar = ({ milestone }) => {
  const { text, status, tanggal } = milestone;
  const progressWidth = status === '0' ? '0%' : '100%';

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <span>{text}</span>
        <span>{tanggal}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
