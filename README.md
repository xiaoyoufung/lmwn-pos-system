# Intern - Software Engineer (Node.js) Assignment

###  Run project

1. install all dependencies
```
npm install
```

## Technology
Frontend
- Vite + React.js + Tailwind.css

Backend
- TypeScript
- Prisma - seeding initial database data
- Express.js

Devops
- Docker

## Architecture 
Clean Architecture and a Modular Monolith (with TypeScript)
reference. https://medium.com/@mwwtstq/building-a-scalable-express-api-using-clean-architecture-and-a-modular-monolith-with-typescript-c855614b05dc


## Features Implemented

### Core (High Priority)
[ ] URS-02: Create new order by adding items and applying discounts (percentage or fixed amount)
- URS-05: Receive validation errors when entering invalid data (negative prices, empty orders)
- URS-03: See order totals calculated automatically (subtotal, discount, final total)
- URS-01: View list of all orders with status and totals
- URS-06: Change order status through defined workflow throughout lifecycle
- URS-07: Be prevented from making invalid status transitions (with clear error messages)
- URS-08: Cancel order from any status (except COMPLETED)
- URS-12: View daily sales summary showing total orders, total revenue, and average order value

### Supporting (Medium Priority)
- URS-04: View detailed order information including all items and pricing breakdown
- URS-09: View complete status change history for any order with timestamps and notes
- URS-10: Filter order list by status (show only PENDING, CONFIRMED, etc.) 
- URS-13: View hourly sales breakdown to identify peak business hours
- URS-14: Select custom date range for sales reports
- URS-11: See dashboard showing count of orders in each status


## Domain Rules

### Money Handling
- All amounts stored as integers in minor units (satang: 1 baht = 100 satang)
- Prevents floating-point precision errors in financial calculations
- Display layer converts to decimal (e.g., 10050 → 100.50 baht)

### Order Lifecycle
PENDING → CONFIRMED → PREPARING → READY → COMPLETED
         ↓
    CANCELLED (allowed from any state)

### Discount Calculation
1. Percentage discounts applied first (e.g., 10% off)
2. Fixed discounts applied second (e.g., -20 baht)
3. Round down to nearest satang
4. Final total cannot go below 0

Example: 
- Subtotal: 10050 satang (100.50 baht)
- 10% discount: -1005 satang (round down 1005.0)
- Fixed -500 satang (-5 baht)
- **Final: 8545 satang (85.45 baht)**