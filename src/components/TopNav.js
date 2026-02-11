import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setVille } from "../slice";
import { useNavigate, Link } from "react-router-dom";

function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ville, setVillee] = useState("");
  const [inputVille, setInput] = useState("");

  function handleClick() {
    setInput("");
    setVillee(inputVille);
    dispatch(setVille(inputVille));
    if (inputVille.trim()) {
        navigate(`/details/${inputVille}`);
    }
  }
  return (
    <header className='flex items-center justify-between px-12 py-6 z-10'>
      <div className='flex items-center gap-8'>
        <Link to="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity'>
          <h2 className='text-white text-xl font-bold tracking-tight'>
            SkyCode
          </h2>
        </Link>
        <Link to="/" className='text-sm font-medium text-white/60 hover:text-white transition-colors'>
            Home
        </Link>
      </div>

      <div className='flex items-center gap-6'>
        <div className='relative glass rounded-lg px-3 py-1.5 flex items-center gap-3 w-64 border-white/5'>
          <button
            onClick={() => {
              handleClick();
            }}
            className='material-symbols-outlined text-white/40 text-lg'
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
            className='bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/30 p-0'
            placeholder='Search cities...'
            type='text'
          />
        </div>

        <div className='flex gap-3'></div>
      </div>
    </header>
  );
}

export default TopNav;
