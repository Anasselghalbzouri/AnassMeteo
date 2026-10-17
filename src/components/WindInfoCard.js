import React from "react";
import { kmhFromMps, windLabel } from "../utils/format";

function WindInfoCard({ windSpeed }) {
  const kmh = kmhFromMps(windSpeed);
  return (
    <div className="glass h-24 rounded-2xl p-4 flex items-center justify-between border-slate-200/60">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">
            air
          </span>
        </div>
        <div>
          <p className="text-slate-400 text-[10px] uppercase font-bold">Wind</p>
          <p className="text-slate-900 text-lg font-bold">
            {kmh != null ? `${kmh} km/h` : "—"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-emerald-500 text-xs font-medium">
          {windLabel(kmh)}
        </span>
      </div>
    </div>
  );
}

export default WindInfoCard;
