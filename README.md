# Expense Tracker 💰

A simple and responsive web-based Expense Tracker built using HTML, CSS, and JavaScript.

The application allows users to manage their income and expenses, view transaction details, calculate totals, and store data using the browser's Local Storage.

## Features

- Add income
- Add expenses
- Form validation
- Prevent future dates
- Display recent transactions
- Search transactions
- Filter transactions by category
- Delete individual transactions
- Automatically calculate:
  - Total Income
  - Total Expenses
  - Current Balance
- Persistent data using Local Storage
- Unique transaction IDs using `Date.now()`
- Reset all stored data
- Responsive user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage
- DOM Manipulation

## How It Works

### Adding Income

Users can enter:

- Income source
- Amount
- Category
- Date
- Note

The income is stored in Local Storage under:

```text
income_dets# Expense_tracker

