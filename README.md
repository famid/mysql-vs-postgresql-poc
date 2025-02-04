# PostgreSQL vs MySQL Performance Benchmark

Welcome to the **PostgreSQL vs MySQL Performance Benchmark** project! This project is a practical extension of my blog: [PostgreSQL vs MySQL: A Developer's Dilemma (With a Dash of Sarcasm)](link-to-your-blog). If you're here after reading the blog, you're about to dive into the code behind the benchmarks and performance comparisons.

## 🚀 Project Overview
This project compares the performance of PostgreSQL and MySQL across different types of queries:
- **Simple Queries**
- **Aggregation Queries**
- **Filtering Queries**
- **JSON Handling**
- **Complex Joins**

The goal is to provide real-world performance insights and help developers make informed decisions when choosing between PostgreSQL and MySQL.

## 🗂️ Project Structure
```
mysql-vs-postgresql-poc/
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package-lock.json
├── package.json
└── src/
    ├── config/
    │   └── db.js
    ├── index.js
    ├── models/
    │   ├── mysql-models.js
    │   └── postgresql-models.js
    ├── scripts/
    │   ├── benchmark-runner.js
    │   └── seed.js
    ├── test-cases/
    │   └── queries.js
    └── utils/
        └── chart-generator.js
```

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites
- **Docker** & **Docker Compose**
- **Node.js** (if running without Docker)

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/famid/mysql-vs-postgresql-poc
cd db-experiment
```

### 3️⃣ Environment Configuration
Create a `.env` file based on `.env.example`:
```ini
# PostgreSQL
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# MySQL
MYSQL_USER=myuser
MYSQL_PASSWORD=mypassword
MYSQL_DB=mydb
MYSQL_HOST=localhost
MYSQL_PORT=3306
```

---

## 🚀 Running the Project

### **Run with Docker**
```bash
docker-compose up --build
```
This will:
- Start PostgreSQL and MySQL containers
- Seed data into both databases
- Run benchmark tests
- Generate performance comparison charts

### **Run Without Docker**
Make sure PostgreSQL and MySQL are running on your local machine.

```bash
# Install dependencies
npm install

# Seed the databases manually
npm run seed

# Run the benchmark tests
npm start
```

After running `npm start`, you'll receive a **chart link** like this:

```bash
Chart URL: https://quickchart.io/chart/render/sf-b4403731-0f00-422f-8dc1-d14b9098d4cb
```

Simply **click the link** or **copy and paste** it into your browser to view the performance comparison chart.

---

## 📦 NPM Scripts
```json
"scripts": {
  "start": "node src/index.js",           // Runs the benchmark tests
  "seed": "node src/scripts/seed.js",      // Seeds the PostgreSQL and MySQL databases
  "benchmark-runner": "node src/scripts/benchmark-runner.js" // Runs benchmarks separately
}
```

- **`npm start`**: Executes performance tests and generates comparison charts.
- **`npm run seed`**: Seeds both databases with test data.
- **`npm run benchmark-runner`**: Runs benchmark tests without generating the chart.

---

## 🔍 Adding New Queries
You can easily add new queries to experiment with.

1. Open `src/test-cases/queries.js`
2. Add a new test case:
```javascript
{
  name: 'New Query Example',
  postgresQuery: 'SELECT * FROM "NewTable";',
  mysqlQuery: 'SELECT * FROM `NewTable`;'
}
```
3. Save the file and run:
```bash
npm start
```

Your new query will be included in the benchmark results.

---

## 🤔 Why This Project?
Choosing between PostgreSQL and MySQL isn’t just about popularity—it’s about performance, scalability, and your specific use case. This project provides real-world benchmarks to guide developers in making informed decisions.

## 🔗 Blog Connection
Want to dive deeper? Read the full blog post:
**[PostgreSQL vs MySQL: A Developer's Dilemma (With a Dash of Sarcasm)](link-to-your-blog)**

## 💡 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License
This project is licensed under the **MIT License**.

