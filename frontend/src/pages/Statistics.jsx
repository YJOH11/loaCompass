import React from "react";
import StatisticsTabs from "../components/statistics/StatisticsTabs";

export default function Statistics() {
  return (
    <div className="p-6">
      {/* 제목은 StatisticsTabs로 넘김 */}
      <StatisticsTabs title="로아 인구 통계" />
    </div>
  );
}
