import React from "react";
import { humidityLabel } from "../utils/format";

function SmallInfoCard({ humidity }) {
  return (
    <div className="glass h-24 rounded-2xl p-4 flex items-center justify-between border-slate-200/60">
      <div className="flex items-center gap-4">
        <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">
            water_drop
          </span>
        </div>
        <div>
          <p className="text-slate-400 text-[10px] uppercase font-bold">
            Humidity
          </p>
          <p className="text-slate-900 text-lg font-bold">
            {humidity != null ? `${humidity}%` : "—"}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-emerald-500 text-xs font-medium">
          {humidityLabel(humidity)}
        </span>
      </div>
    </div>
  );
}

export default SmallInfoCard;
