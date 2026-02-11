import React from "react";

function WindInfoCard({ windSpeed }) {
  const kmh = windSpeed != null ? Math.round(windSpeed * 3.6) : null;
  return (
    <div className='glass h-24 rounded-2xl p-4 flex items-center justify-between border-white/5'>
      <div className='flex items-center gap-4'>
        <div className='size-10 bg-primary/20 rounded-lg flex items-center justify-center'>
          <span className='material-symbols-outlined text-primary'>air</span>
        </div>
        <div>
          <p className='text-white/40 text-[10px] uppercase font-bold'>Wind</p>
          <p className='text-white text-lg font-bold'>{kmh != null ? `${kmh} km/h` : "—"}</p>
        </div>
      </div>
      <div className='text-right'>
        <span className='text-green-400 text-xs font-medium'>Breezy</span>
      </div>
    </div>
  );
}

export default WindInfoCard;
