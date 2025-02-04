# Database Performance Comparison

Welcome to the **Database Performance Comparison** project! This project was inspired by my blog post: [PostgreSQL vs MySQL: A Developer's Dilemma (With a Dash of Sarcasm)](link-to-your-blog). If you're here after reading the blog, you're about to dive into the code behind the benchmarks and comparisons.

## 🚀 Project Overview
This project compares the performance of PostgreSQL and MySQL for different types of queries, including:
- **Simple Queries**
- **Aggregation Queries**
- **Filtering Queries**
- **JSON Handling**
- **Complex Joins**

The goal is to understand how each database performs under various conditions and why.

## 🗂️ Project Structure
```
database-performance-comparison/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── index.js
│   ├── models/
│   │   ├── mysql-models.js
│   │   └── postgresql-models.js
│   ├── scripts/
│   │   ├── benchmark-runner.js
│   │   └── seed.js
│   ├── test-cases/
│   │   └── queries.js
│   └── utils/
│       └── chart-generator.js
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
- Docker & Docker Compose
- Node.js (if running without Docker)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/database-performance-comparison.git
cd database-performance-comparison
```

### 3️⃣ Environment Configuration
Create a `.env` file:
```ini
# PostgreSQL
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb

# MySQL
MYSQL_USER=myuser
MYSQL_PASSWORD=mypassword
MYSQL_DB=mydb
```

### 4️⃣ Run with Docker Compose
```bash
docker-compose up --build
```
This will:
- Start PostgreSQL and MySQL containers
- Seed data into both databases
- Run benchmark tests
- Generate performance comparison charts

### 5️⃣ View Results
The performance results and chart URLs will be displayed in the terminal.

## 📊 Test Cases
1. **Simple Query:** Basic `SELECT *` operations
2. **Aggregation Query:** Summing values across large datasets
3. **Filtering Query:** Using `WHERE` clauses
4. **JSON Query:** Sorting based on JSON data
5. **Complex Join:** Joining tables with aggregation and sorting

## 🤔 Why This Project?
Choosing between PostgreSQL and MySQL isn’t just about popularity—it's about performance, scalability, and the specific needs of your application. This project shows real-world performance data to help developers make informed decisions.

## 🔗 Blog Connection
Want to understand the theory behind the code? Read the full story in my blog:
**[PostgreSQL vs MySQL: A Developer's Dilemma (With a Dash of Sarcasm)](link-to-your-blog)**

## 💡 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License
This project is licensed under the MIT License.

