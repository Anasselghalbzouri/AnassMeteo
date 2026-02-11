import React from "react";

function MapBackground() {
  return (
    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[400px] pointer-events-none opacity-20">
      <div className="w-full h-full glass rounded-full blur-[100px] bg-primary/20"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        data-location="Paris"
      >
        <svg
          className="text-white/10"
          fill="none"
          height="400"
          viewBox="0 0 400 400"
          width="400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="100"
            stroke="currentColor"
            strokeDasharray="10 10"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default MapBackground;
