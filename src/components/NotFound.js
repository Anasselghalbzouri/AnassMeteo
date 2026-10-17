import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-slate-900 text-6xl font-bold">404</h1>
      <p className="text-slate-500 text-lg">This page doesn&apos;t exist.</p>
      <Link
        to="/"
        className="glass rounded-xl px-6 py-3 text-slate-700 hover:bg-white/90 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
