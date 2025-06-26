import React from "react";
import StatisticsTabs from "../components/statistics/StatisticsTabs";

export default function Statistics() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-transparent">
          <StatisticsTabs title="로아 인구 통계" />
        </div>
      </div>
    </div>
  );
}
