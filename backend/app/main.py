from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import *
from app.api.vendor_routes import (
    router as vendor_router
)

from app.api.challan_routes import (
    router as challan_router
)

from app.api.supplier_routes import (
    router as supplier_router
)

from app.api.challan_return_routes import (
    router as return_router
)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vendor_router)

app.include_router(supplier_router)

app.include_router(challan_router)

app.include_router(return_router)

@app.get("/")
def root():
    return {
        "message": "Backend Running Successfully"
    }