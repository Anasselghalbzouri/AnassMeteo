import React from "react";

function DetailCard({ icon, label, value }) {
  return (
    <div className='glass p-4 rounded-xl flex flex-col gap-2 border-white/5'>
      <div className='flex items-center gap-2 text-white/60'>
        <span className='material-symbols-outlined text-xl'>{icon}</span>
        <span className='text-xs font-medium uppercase'>{label}</span>
      </div>
      <span className='text-white text-2xl font-semibold'>{value}</span>
    </div>
  );
}

export default DetailCard;
