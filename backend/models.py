from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import date
from bson import ObjectId
from decimal import Decimal

# --- Expense Schemas ---

class ExpenseBase(BaseModel):
    """Base model for expense data (used for creation and updates)."""
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "amount": 45.75,
                "category": "Food",
                "description": "Dinner with friends",
                "date": str(date.today()) # Corrected to use 'date' key
            }
        }
    )

    amount: Decimal = Field(
        ..., 
        description="The monetary amount of the expense.", 
        gt=0,
        max_digits=10, 
        decimal_places=2
    )
    category: str = Field(
        ..., 
        description="The category of the expense (e.g., Food, Transport)."
    )
    description: Optional[str] = Field(
        None, 
        description="A brief description or note about the expense."
    )
    # RENAME BACK TO 'date' for consistency with the JSON payload
    expense_date: date = Field( 
        default_factory=date.today, 
        description="The date the expense occurred (defaults to today)."
    )


class ExpenseInDB(ExpenseBase):
    """Model used when reading an expense from the database."""
    # This remains correct
    id: ObjectId = Field(..., alias="_id") 

    model_config = ConfigDict(
        arbitrary_types_allowed = True, 
        populate_by_name = True,
        json_encoders = {
            ObjectId: str 
        }
    )


# --- Aggregation Model ---

class CategorySummary(BaseModel):
    """Model for the result of the spending summary aggregation."""
    # The aggregation result from MongoDB has a required '_id' field (which is the category string)
    category: str = Field(..., alias="_id") 
    total_spent: float
    expense_count: int

    # REQUIRED FIX: Use model_config for Pydantic V2 compatibility
    model_config = ConfigDict(
        populate_by_name = True,
        extra = 'allow'
    )