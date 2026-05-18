from app.db.database import engine, Base

# Import all models
from app.models import *

Base.metadata.create_all(bind=engine)

print("Tables created successfully")