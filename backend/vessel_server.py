import asyncio
import json
import random

import websockets

vessels = [
    {"id": 1, "lat": 17.68, "lon": 83.21},
    {"id": 2, "lat": 15.91, "lon": 80.45},
    {"id": 3, "lat": 13.08, "lon": 80.27},
]


async def vessel_stream(websocket):
    while True:
        for vessel in vessels:
            vessel["lat"] += random.uniform(-0.01, 0.01)
            vessel["lon"] += random.uniform(-0.01, 0.01)
            await websocket.send(json.dumps(vessel))

        await asyncio.sleep(2)


async def main():
    async with websockets.serve(vessel_stream, "0.0.0.0", 8001):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
