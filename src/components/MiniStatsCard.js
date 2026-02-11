import React from "react";
import SmallInfoCard from "./SmallInfoCard";
import WindInfoCard from "./WindInfoCard";

function MiniStatsCard({ humidity, windSpeed }) {
  return (
    <div className='glass max-w-2xl rounded-xl p-6 flex gap-4 items-center border-white/10'>
      <div className='flex-1 flex flex-col gap-4'>
        <SmallInfoCard humidity={humidity} />
        <WindInfoCard windSpeed={windSpeed} />
      </div>
    </div>
  );
}

export default MiniStatsCard;
