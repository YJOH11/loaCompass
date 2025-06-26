export const CHART_COLORS = [
  '#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77',
  '#FF922B', '#845EC2', '#00C9A7', '#F9C74F',
  '#F94144', '#43AA8B', '#F3722C', '#577590',
  '#B5179E', '#9A031E', '#90CAF9', '#E53935',
];

export const LABEL_STYLE = {
  fill: '#111',
  fontWeight: 'bold',
  fontSize: 13,
};

export const TOOLTIP_STYLE = {
  fontSize: '14px',
  fontWeight: 'bold',
};

export function formatPercent(value, total) {
  return total ? `${((value / total) * 100).toFixed(1)}%` : '0%';
}

export function sortByCountDesc(data) {
  return [...data].sort((a, b) => b.count - a.count);
}