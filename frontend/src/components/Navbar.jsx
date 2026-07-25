function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        SustainAI Insight 🌱
      </h1>

      <div>
        <button className="bg-white text-green-700 px-4 py-2 rounded-lg">
          Dashboard
        </button>
      </div>
    </nav>
  )
}

export default Navbar