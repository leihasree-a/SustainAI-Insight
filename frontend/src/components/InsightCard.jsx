function InsightCard({insight}) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <h3 className="font-bold text-green-700">
        AI Sustainability Insight 🤖
      </h3>

      <p className="mt-2 text-gray-700">
        {insight}
      </p>
    </div>
  )
}

export default InsightCard