from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

class Database:
    def __init__(self):
        if not MONGO_URI:
            raise ValueError("MONGO_URI not found in environment variables.")
        
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DATABASE_NAME]
        
        self.expenses_collection = self.db["expenses"]
        print("MongoDB Client initialized successfully.")
    
    def get_expenses_collection(self):
        return self.expenses_collection
    

try:
    db_instance = Database()
except ValueError as e:
    print(f"Database initialization error: {e}")
    db_instance = None

def get_db_client():
    return db_instance

