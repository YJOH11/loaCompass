// AccessoryList.jsx
import AccessoryCard from "./AccessoryCard";

export default function AccessoryList({ accessories = [] }) {
  const filtered = accessories.filter((item) =>
    ["목걸이", "귀걸이", "반지"].includes(item.Type)
  );

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((item, idx) => (
        <AccessoryCard key={idx} item={item} />
      ))}
    </div>
  );
}
