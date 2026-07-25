import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CustomLineChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">
        Sustainability Trends (2020–2024)
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            yAxisId="left"
            label={{
              value: "CO₂",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Renewable %",
              angle: 90,
              position: "insideRight",
            }}
          />

          <Tooltip />

          <Legend />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="co2_emission"
            stroke="#16a34a"
            strokeWidth={3}
            dot={false}
            name="CO₂ Emission"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="renewable_share"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            name="Renewable Share"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;