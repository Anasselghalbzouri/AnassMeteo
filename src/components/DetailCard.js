import React from "react";

function DetailCard({ icon, label, value }) {
  return (
    <div className="glass p-4 rounded-xl flex flex-col gap-2">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="material-symbols-outlined text-xl" aria-hidden="true">
          {icon}
        </span>
        <span className="text-xs font-medium uppercase">{label}</span>
      </div>
      <span className="text-slate-900 text-2xl font-semibold">{value}</span>
    </div>
  );
}

export default DetailCard;
