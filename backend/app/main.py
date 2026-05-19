# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.models import *
# from app.api.vendor_routes import (
#     router as vendor_router
# )

# from app.api.challan_routes import (
#     router as challan_router
# )

# from app.api.supplier_routes import (
#     router as supplier_router
# )

# from app.api.challan_return_routes import (
#     router as return_router
# )

# from app.api.auth_routes import (
#     router as auth_router
# )


# from app.api.dashboard_routes import (
#     router as dashboard_router
# )

# from app.api.ledger_routes import (
#     router as ledger_router
# )

# app = FastAPI()

# origins = [
#     "http://localhost:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(vendor_router)

# app.include_router(supplier_router)

# app.include_router(challan_router)

# app.include_router(return_router)

# app.include_router(auth_router)

# app.include_router(dashboard_router)

# app.include_router(ledger_router)

# @app.get("/")
# def root():
#     return {
#         "message": "Backend Running Successfully"
#     }



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from app.models import *

from app.api.vendor_routes import router as vendor_router
from app.api.challan_routes import router as challan_router
from app.api.supplier_routes import router as supplier_router
from app.api.challan_return_routes import router as return_router
from app.api.auth_routes import router as auth_router
from app.api.dashboard_routes import router as dashboard_router
from app.api.ledger_routes import router as ledger_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(vendor_router)
app.include_router(supplier_router)
app.include_router(challan_router)
app.include_router(return_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(ledger_router)

# React Frontend Build Path
frontend_path = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"

# Serve React Static Files
if frontend_path.exists():
    app.mount(
        "/assets",
        StaticFiles(directory=frontend_path / "assets"),
        name="assets"
    )

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        file_path = frontend_path / full_path

        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)

        return FileResponse(frontend_path / "index.html")


@app.get("/api/health")
def health():
    return {
        "message": "Backend Running Successfully"
    }