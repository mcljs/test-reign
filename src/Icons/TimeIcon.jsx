import React from "react";

export default function TimeIcon({className}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      viewBox='0 0 16 16'
    >
      <path
        fill='#606060'
        d='M8 1.333c3.676 0 6.667 2.991 6.667 6.667 0 3.676-2.991 6.667-6.667 6.667-3.676 0-6.667-2.991-6.667-6.667 0-3.676 2.991-6.667 6.667-6.667zM8 0C3.582 0 0 3.582 0 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm.667 8V4H7.333v5.333H12V8H8.667z'
      />
    </svg>
  );
}
