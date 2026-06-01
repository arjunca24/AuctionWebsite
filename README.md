# AuctionWebsite

A full-stack auction web application where users can register, list items for auction, place bids, and track their sales — all in real time with countdown timers.

---

## Features

- **User Authentication** — Register and log in with hashed passwords (bcrypt)
- **Browse Auctions** — Filter by category, search by name, sort by price or end date, and filter by price range
- **Bid on Items** — Place bids on live auctions with real-time countdown timers
- **Create Auctions** — List items with images, descriptions, estimated value, reserve price, and end date
- **Sales Dashboard** — View your auction history and bid activity with Chart.js graphs
- **Automatic Bidding** — Set automatic bid limits on auctions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| UI | Material UI (MUI v4 & v5), FontAwesome |
| Charts | Chart.js, react-chartjs-2 |
| Backend | Node.js, Express.js |
| Database | Microsoft SQL Server (mssql) |
| Auth | bcrypt / bcryptjs |

---

## Screenshots

> *(Add screenshots here)*

---

## Getting Started

### Prerequisites

- Node.js
- Microsoft SQL Server

### Database Setup

1. Create a database called `AuctionSystem`
2. Run the `CREATE TABLE` queries in `src/SQL/Queries.sql` to create the `Auction`, `Users`, and `Bids` tables
3. Create a SQL login called `systemLogin` with password `Oracle123`
4. In `src/SQL/dbConfig.js`, update the `server` field to your SQL Server instance name

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/auction-website.git
cd auction-website

# Install dependencies
npm install

# Start both the Express server and React app
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000), create an account, and start bidding!

---

## Project Structure

```
src/
├── components/       # Reusable components (Navbar, Card, utility functions)
├── pages/            # Page components (Login, Register, Auctions, Auction, Sales, CreateAuction)
├── SQL/              # Database config, query functions, and SQL scripts
└── styles/           # CSS stylesheets
server.js             # Express API server (runs on port 999)
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api` | Generic SELECT query |
| POST | `/bid` | Place a bid |
| POST | `/create` | Create an auction |
| POST | `/register` | Register a new user |
| POST | `/update` | Update auction fields |

---

## Author

**Arjun Anish**
