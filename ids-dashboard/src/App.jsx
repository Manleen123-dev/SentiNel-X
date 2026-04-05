import { useEffect, useState } from "react";
import "./App.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  const [packets, setPackets] = useState([]);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPackets = () => {
      fetch("http://localhost:3000/packets")
        .then(res => res.json())
        .then(data => {
          setPackets(data);
          const attackCount = data.filter(p => p.status === "suspicious").length;
          setHistory(prev => [...prev.slice(-20), attackCount]);
        });
    };

    fetchPackets();
    const interval = setInterval(fetchPackets, 2000);
    return () => clearInterval(interval);
  }, []);

  const total = packets.length;
  const attacks = packets.filter(p => p.status === "suspicious").length;
  const normal = total - attacks;

  // 🔥 TOP ATTACKER
  const ipCount = {};
  packets.forEach(p => {
    if (p.status === "suspicious" && p.src_ip) {
      ipCount[p.src_ip] = (ipCount[p.src_ip] || 0) + 1;
    }
  });

  let topIP = null, max = 0;
  for (let ip in ipCount) {
    if (ipCount[ip] > max) {
      max = ipCount[ip];
      topIP = ip;
    }
  }

  // FILTER
  const filteredPackets = packets.filter(p => {
    if (filter === "threat") return p.status === "suspicious";
    if (filter === "safe") return p.status === "normal";
    return true;
  });

  // LINE
  const lineData = {
    labels: history.map((_, i) => i),
    datasets: [{
      label: "Threat Activity",
      data: history,
      borderColor: "#22d3ee",
      backgroundColor: "rgba(34,211,238,0.15)",
      tension: 0.4,
      fill: true,
      pointRadius: 2,
      pointHoverRadius: 6
    }]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#94a3b8" } } },
    scales: {
      x: { ticks: { color: "#64748b" }, grid: { color: "rgba(100,116,139,0.1)" }},
      y: { ticks: { color: "#64748b" }, grid: { color: "rgba(100,116,139,0.1)" }}
    }
  };

  // PIE
  const pieData = {
    labels: ["Safe", "Threats"],
    datasets: [{
      data: [normal, attacks],
      backgroundColor: ["#22c55e", "#f87171"],
      borderWidth: 2,
      hoverOffset: 15
    }]
  };

  const pieOptions = {
    plugins: { legend: { labels: { color: "#cbd5f5" } } },
    cutout: "65%"
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="header">
        <h1>🛡 SentinelX</h1>
        <p className="status">● System Active</p>

        <div className={`alert ${attacks === 0 ? "safe" : ""}`}>
          {attacks > 0
            ? `🚨 ${attacks} Threats Detected`
            : "✅ All Systems Secure"}
        </div>
      </div>

      {/* CARDS */}
      <div className="cards">
        <div className="card">
          <h3>Total</h3>
          <h1>{total}</h1>
        </div>

        <div className="card highlight">
          <h3>Top Attacker</h3>
          <h1>{topIP || "None"}</h1>
        </div>

        <div className="card red">
          <h3>Threats</h3>
          <h1>{attacks}</h1>
        </div>

        <div className="card green">
          <h3>Safe</h3>
          <h1>{normal}</h1>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts">
        <div className="box">
          <h3>Threat Trend</h3>
          <div className="chart">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="box">
          <h3>Traffic Distribution</h3>
          <div className="chart">
            <Doughnut data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="filters">
        <button className={filter==="all"?"active":""} onClick={()=>setFilter("all")}>All</button>
        <button className={filter==="threat"?"active":""} onClick={()=>setFilter("threat")}>Threats</button>
        <button className={filter==="safe"?"active":""} onClick={()=>setFilter("safe")}>Safe</button>
      </div>

      {/* LOGS */}
      <div className="logs">
        <h3>⚡ Activity Feed</h3>

        {filteredPackets.slice(0, 15).map((p,i)=>(
          <div key={i} className={`log ${p.status==="suspicious"?"attack":"normal"}`}>
            <span>{p.status==="suspicious"?"🚨":"✅"}</span>
            <span>{p.src_ip}</span>
            <span>{new Date(p.time).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;