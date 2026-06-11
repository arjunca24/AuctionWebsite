
# AuctionWebsite

A full-stack auction website where users can register, list items, place bids with live countdown timers, and track sales via an analytics dashboard.
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
## Demo

[https://github.com/arjunca24/AuctionWebsite/blob/main/auction_showcase_2x.mp4](https://github.com/user-attachments/assets/18541a80-e4e1-462c-8d94-b2e0d22d6f0b)

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
git clone https://github.com/arjunca24/AuctionWebsite.git

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


## Author

**Arjun Anish**
