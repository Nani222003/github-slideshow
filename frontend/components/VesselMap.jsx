import { useEffect, useState } from "react";

export default function VesselMap() {
  const [lastVesselUpdate, setLastVesselUpdate] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8001");

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      setLastVesselUpdate(data);
      console.log("Vessel position", data);
    };

    ws.onerror = (event) => {
      console.error("Vessel socket error", event);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-[500px] bg-black text-white flex flex-col items-center justify-center gap-2">
      <p className="text-lg">Live Vessel Tracking</p>
      <p className="text-sm text-gray-400">
        {lastVesselUpdate
          ? `Latest vessel ${lastVesselUpdate.id}: ${lastVesselUpdate.lat.toFixed(4)}, ${lastVesselUpdate.lon.toFixed(4)}`
          : "Waiting for vessel updates..."}
      </p>
    </div>
  );
}
