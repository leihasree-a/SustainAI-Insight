function StatCard({ title, value, unit }) {
  let color = "text-green-700";
  let status = "";
  let icon = "📊";

  switch (title) {
    case "Records":
      icon = "📄";
      break;
    case "Countries":
      icon = "🌍";
      break;
    case "Avg CO₂":
      icon = "🌫️";
      break;
    case "Renewable Share":
      icon = "🌱";
      break;
    case "Sustainability Score":
      icon = "⭐";

      if (value >= 80) {
        color = "text-green-600";
        status = "🟢 Excellent";
      } else if (value >= 60) {
        color = "text-blue-600";
        status = "🔵 Good";
      } else if (value >= 40) {
        color = "text-yellow-600";
        status = "🟡 Moderate";
      } else {
        color = "text-red-600";
        status = "🔴 Poor";
      }
      break;
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition duration-300">
      <h3 className="text-gray-500 font-semibold text-lg">
        {icon} {title}
      </h3>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>

      <span className="text-sm text-gray-600">
        {unit}
      </span>

      {title === "Sustainability Score" && (
        <p className="mt-2 font-semibold">
          {status}
        </p>
      )}
    </div>
  );
}

export default StatCard;