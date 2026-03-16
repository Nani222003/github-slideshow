import React, { useEffect, useState } from "react";

export default function ExportAdvisor() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/advisor/recommendations?port_id=1&product_id=5&horizon_days=90")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (isMounted) {
          setData(Array.isArray(res) ? res : []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-red-400">Failed to load recommendations: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <div
          key={`${item.country ?? "country"}-${index}`}
          className="bg-[#0A0A0A] border border-cyan-400/40 rounded-xl p-6 shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105 transition"
        >
          <h2 className="text-white text-xl font-semibold">{item.country}</h2>

          <p className="text-cyan-300 mt-2">Score: {item.score}</p>

          <p className="text-gray-400 mt-1">Expected Volume: {item.expected_volume}</p>

          <p className="text-gray-500 text-sm mt-3">Confidence: {item.confidence}</p>
        </div>
      ))}
    </div>
  );
}
