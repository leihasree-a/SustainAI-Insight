import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import InsightCard from "./components/InsightCard";
import CustomLineChart from "./components/LineChart";
import CountryBarChart from "./components/CountryBarChart";

function App() {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");

  useEffect(() => {
  axios
    .get("http://127.0.0.1:5000/api/countries")
    .then((res) => setCountryData(res.data))
    .catch((err) => console.log(err));

  axios
    .get("http://127.0.0.1:5000/api/country-list")
    .then((res) => setCountries(res.data))
    .catch((err) => console.log(err));
}, []);

  useEffect(() => {
  let chartUrl = "http://127.0.0.1:5000/api/chart";
  let summaryUrl = "http://127.0.0.1:5000/api/summary";

  if (selectedCountry !== "All") {
    chartUrl += `?country=${selectedCountry}`;
    summaryUrl += `?country=${selectedCountry}`;
  }

  axios
    .get(chartUrl)
    .then((res) => setChartData(res.data))
    .catch((err) => console.log(err));

  axios
    .get(summaryUrl)
    .then((res) => setSummary(res.data))
    .catch((err) => console.log(err));
}, [selectedCountry]);

  if (!summary) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-xl font-semibold text-green-700">
        Loading Sustainability Dashboard...
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">

        <h2 className="text-3xl font-bold mb-6">
          {selectedCountry === "All"
          ? "🌍 Global Sustainability Dashboard"
          : `🌍 ${selectedCountry} Sustainability Dashboard`}
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <StatCard
            title="Records"
            value={summary.total_records}
            unit="rows"
          />

          <StatCard
            title="Countries"
            value={summary.countries}
            unit="countries"
          />

          <StatCard
            title="Avg CO₂"
            value={summary.average_co2}
            unit="ppm"
          />

          <StatCard
            title="Renewable Share"
            value={summary.average_renewable}
            unit="%"
          />
          <StatCard
  title="Sustainability Score"
  value={summary.sustainability_score}
  unit="/100"
/>

        </div>

        {/* Country Dropdown */}

        <div className="flex items-center gap-4 my-8">

          <label className="text-lg font-semibold">
            Select Country:
          </label>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border rounded-lg p-2 bg-white shadow"
          >

            <option value="All">
              All Countries
            </option>

            {countries.map((country) => (
              <option
                key={country}
                value={country}
              >
                {country}
              </option>
            ))}

          </select>

        </div>

        {/* Monthly Trend */}

        <CustomLineChart data={chartData} />

        {/* Country Bar Chart */}

        <CountryBarChart data={countryData} />

        {/* AI Insight */}

        <div className="mt-8">

          <InsightCard
  insight={`🌍 ${selectedCountry} sustainability overview:

• Average CO₂ Emission: ${summary.average_co2} ppm
• Renewable Energy Share: ${summary.average_renewable}%
• Sustainability Score: ${summary.sustainability_score}/100

💡 Higher renewable energy usage can help reduce carbon emissions and improve long-term sustainability.`}
/>

        </div>

      </div>

    </div>
  );
}

export default App;