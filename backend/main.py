"""FastAPI entrypoint placeholder for advisor endpoints."""

from fastapi import FastAPI

app = FastAPI(title="Global Nautical Export Portal API")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
