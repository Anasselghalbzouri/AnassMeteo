import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setVille } from "../slice";
import { logout } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputVille, setInput] = useState("");

  function handleClick() {
    const city = inputVille.trim();
    setInput("");
    if (city) {
      dispatch(setVille(city));
      navigate(`/details/${encodeURIComponent(city)}`);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-6 z-10 gap-4">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <h2 className="text-slate-900 text-xl font-bold tracking-tight">
            SkyCode
          </h2>
        </Link>
        <Link
          to="/"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Home
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative glass rounded-lg px-3 py-1.5 flex items-center gap-3 w-40 sm:w-64 border-white/5">
          <button
            onClick={handleClick}
            aria-label="Search city"
            className="material-symbols-outlined text-slate-400 text-lg"
          >
            search
          </button>
          <input
            value={inputVille}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick();
              }
            }}
            className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-900 placeholder:text-slate-400 p-0"
            placeholder="Search cities..."
            type="text"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
