import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-white text-6xl font-bold">404</h1>
      <p className="text-white/60 text-lg">This page doesn&apos;t exist.</p>
      <Link
        to="/"
        className="glass rounded-xl px-6 py-3 text-white hover:bg-white/10 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
