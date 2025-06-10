import React from 'react';

const JobTierDisplay = ({ jobTiers }) => {
    return (
        <div className="w-full px-4 py-3 bg-white/70 dark:bg-black/50 backdrop-blur-sm z-10">
            <div className="flex flex-wrap gap-4 justify-center">
                {jobTiers.map((jobTier, index) => {
                    const {
                        job,
                        tier,
                        iconUrl,
                        count,
                        formattedTime,
                    } = jobTier;

                    const imageSrc = iconUrl || '/icons/default_icon.png';

                    return (
                        <div
                            key={index}
                            className="relative flex flex-col items-center w-16 group"
                        >
                            <img
                                src={imageSrc}
                                alt={job}
                                className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600"
                            />
                            <span className="mt-1 text-xs font-medium text-gray-800 dark:text-white">
                                {tier}티어
                            </span>

                            {/* 툴팁 */}
                            <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-50 shadow-lg pointer-events-none">
                                <div className="font-bold text-sm mb-1">{job}</div>
                                <div>클리어 횟수: {count}회</div>
                                <div>평균 클리어: {formattedTime}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default JobTierDisplay;
