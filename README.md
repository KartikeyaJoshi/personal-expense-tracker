\# 💰 Personal Expense Tracker (FastAPI + React + MongoDB)



\## Project Overview



The \*\*Personal Expense Tracker\*\* is a modern, full-stack web application designed to help users monitor and manage their daily spending habits. It features a clean, responsive, dashboard-style UI inspired by minimalism and efficiency.



The project demonstrates key skills in API development (FastAPI), NoSQL data management (MongoDB Aggregation), and front-end state management (ReactJS).



---



\## ✨ Features



\* \*\*Full CRUD:\*\* Create, Read, Update, and Delete expense records seamlessly.

\* \*\*Intuitive UI:\*\* A clean, responsive, three-column layout (Add Expense, Expense List, Chart Summary) for a single-view experience.

\* \*\*NoSQL Aggregation:\*\* Backend processing using MongoDB's `$group` and `$sum` operators to categorize and summarize spending in real-time.

\* \*\*Data Visualization:\*\* Real-time Doughnut chart visualization of spending distribution using Chart.js.

\* \*\*Aesthetics:\*\* Modern, animated UI with a professional, card-based design.



---



\## 🛠️ Technology Stack



| Component | Technology | Description |

| :--- | :--- | :--- |

| \*\*Backend API\*\* | \*\*Python (FastAPI)\*\* | High-performance, asynchronous web framework. |

| \*\*Database\*\* | \*\*MongoDB\*\* | Flexible NoSQL database for unstructured expense documents. |

| \*\*Frontend\*\* | \*\*ReactJS (CRA)\*\* | Component-based, modern JavaScript library. |

| \*\*Styling\*\* | \*\*CSS3\*\* | Custom, responsive grid layout with modern animations. |

| \*\*Libraries\*\* | `PyMongo`, `Pydantic`, `react-chartjs-2` | Database driver, data validation, and charting, respectively. |



---



\## ⚙️ Getting Started (Local Setup)



\### Prerequisites



You must have the following installed locally:



\* \*\*Python 3.10+\*\*

\* \*\*Node.js 18+\*\*

\* \*\*MongoDB Atlas\*\* (Cloud Database) or a local MongoDB instance running.



\### 1. Backend Setup



1\.  Navigate to the backend directory:

&nbsp;   ```bash

&nbsp;   cd backend

&nbsp;   ```

2\.  Create a Python virtual environment and activate it:

&nbsp;   ```bash

&nbsp;   python -m venv venv

&nbsp;   source venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate

&nbsp;   ```

3\.  Install the required Python packages:

&nbsp;   ```bash

&nbsp;   pip install -r requirements.txt

&nbsp;   ```

4\.  \*\*Configure Database:\*\* Create a file named `.env` in the `backend` directory and add your MongoDB connection string:

&nbsp;   ```dotenv

&nbsp;   MONGO\_URI="mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER\_NAME>.mongodb.net/"

&nbsp;   DATABASE\_NAME="personal\_expense\_tracker"

&nbsp;   ```

5\.  \*\*Run the API Server:\*\*

&nbsp;   ```bash

&nbsp;   uvicorn main:app --reload --host 0.0.0.0 --port 8000

&nbsp;   ```

&nbsp;   The API should be available at `http://127.0.0.1:8000`.



\### 2. Frontend Setup



1\.  Open a \*\*new terminal\*\* and navigate to the frontend directory:

&nbsp;   ```bash

&nbsp;   cd frontend

&nbsp;   ```

2\.  Install Node dependencies:

&nbsp;   ```bash

&nbsp;   npm install

&nbsp;   ```

3\.  \*\*Run the React Development Server:\*\*

&nbsp;   ```bash

&nbsp;   npm start

&nbsp;   ```

&nbsp;   The application will open in your browser at `http://localhost:3000`.



---



\## 🤝 Next Steps \& Contributions



Feel free to fork the repository, suggest improvements, or submit pull requests!



\*\*Possible Enhancements:\*\*

1\.  User Authentication (Login/Register).

2\.  Monthly/Annual budget goal setting.

3\.  Expense editing (`PUT` functionality).

4\.  Filtering expenses by date range.



---

