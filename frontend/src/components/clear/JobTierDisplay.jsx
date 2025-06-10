import React from 'react';

const JobTierDisplay = ({ jobTiers }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white/70 dark:bg-black/50 backdrop-blur-sm z-10">
      <div className="overflow-x-auto">
        <div className="flex gap-4 justify-start relative overflow-visible">
          {jobTiers.map((jobTier, index) => {
            const {
              job,
              tier,
              iconUrl,
              count,
              averageClearTimeInSeconds,
              formattedTime,
            } = jobTier;

            const imageSrc = iconUrl || '/icons/default_icon.png';

            return (
              <div
                key={index}
                className="relative flex flex-col items-center min-w-[60px] overflow-visible group"
              >
                <img
                  src={imageSrc}
                  alt={job}
                  className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600"
                />
                <span className="mt-1 text-[10px] font-medium text-gray-800 dark:text-white">
                  {tier}티어
                </span>

                {/* 툴팁 */}
                <div className="absolute bottom-[48px] left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-lg z-50 pointer-events-none">
                  <div className="font-bold text-sm mb-1">{job}</div>
                  <div>클리어 횟수: {count}회</div>
                  <div>평균 클리어: {formattedTime}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobTierDisplay;
