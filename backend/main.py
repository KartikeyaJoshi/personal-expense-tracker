from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from typing import List
from bson import ObjectId
import json
from datetime import datetime

from database import get_db_client
from models import ExpenseBase, ExpenseInDB, CategorySummary

app = FastAPI(title="SpendWell", description="A simple API to track personal expenses.", version="1.0.0")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://spendwell.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if get_db_client():
    expenses_collection = get_db_client().get_expenses_collection()
else:
    print("FATAL: MongoDB conncetion failed. API Endpoints will not fucntion.")
    expenses_collection = None

def check_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid ObjectId format: {id}")


# API Endpoints

@app.post("/expenses/", response_model=ExpenseInDB, status_code=status.HTTP_201_CREATED)
async def create_expense(expense: ExpenseBase):
    expense_data = jsonable_encoder(expense)
    expense_data['expense_date'] = datetime.combine(expense.expense_date, datetime.min.time())
    expense_data['amount'] = float(expense.amount)
    new_expense = expenses_collection.insert_one(expense_data)
    
    created_expense = expenses_collection.find_one({"_id": new_expense.inserted_id})
    
    if created_expense is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve the newly created expense.")
    
    return created_expense

@app.get("/expenses/{id}", response_model=ExpenseInDB)
async def get_expense(id: str):
    check_object_id(id)
    expense = expenses_collection.find_one({"_id": ObjectId(id)})
    
    if expense is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Expense with ID {id} not found.")
    
    return expense

@app.get("/expenses/", response_model=List[ExpenseInDB])
async def get_expenses():
    expenses = list(expenses_collection.find())
    if expenses is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No expenses found.")
    
    return expenses

@app.put("/expenses/{id}", response_model=ExpenseInDB)
async def update_expense(id: str, expense: ExpenseBase):
    check_object_id(id)
    
    update_data = {k: v for k, v in jsonable_encoder(expense).items() if v is not None}
    
    result = expenses_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Expense with ID {id} not found.")
    
    updated_expense = expenses_collection.find_one({"_id": ObjectId(id)})
    return updated_expense

@app.delete("/expenses/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(id: str):
    check_object_id(id)
    
    result = expenses_collection.delete_one({"_id": ObjectId(id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Expense with ID {id} not found.")
    return

@app.get("/expenses/summary/category", response_model=List[CategorySummary])
async def summarize_expenses_by_category():
    pipeline = [
        {
            "$group": {
                "_id": "$category",
                "total_spent": {"$sum": "$amount"},
                "expense_count": {"$sum": 1}
            }
        },
        {
            "$sort": {"total_spent": -1}
        }
    ]
    
    summary_results = list(expenses_collection.aggregate(pipeline))
    if not summary_results:
        return []
    return summary_results

# For development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
 