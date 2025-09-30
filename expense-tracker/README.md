# 💰 Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances with an intuitive interface, powerful filtering, and insightful analytics.

![Expense Tracker](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### Core Functionality
- **Expense Management**: Add, edit, and delete expenses with comprehensive validation
- **Smart Filtering**: Filter by category, date range, and search by description
- **Data Persistence**: All data stored locally using localStorage
- **CSV Export**: Export your expenses to CSV for external analysis

### Dashboard & Analytics
- **Summary Cards**: Track total spending, monthly spending, average expense, and top category
- **Category Breakdown**: Visual breakdown of spending by category with percentage bars
- **Recent Expenses**: Quick view of your most recent transactions
- **Real-time Analytics**: All metrics update automatically as you add or modify expenses

### User Experience
- **Modern UI**: Clean, professional design with intuitive navigation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Smooth loading indicators for better user feedback
- **Modal Dialogs**: Clean modal interfaces for adding and editing expenses
- **Color-coded Categories**: Easy-to-identify category badges with distinct colors

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**
   ```bash
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## 📖 Usage Guide

### Adding an Expense

1. Navigate to the **Expenses** page
2. Click the **"Add Expense"** button
3. Fill in the form:
   - **Date**: Select the date of the expense
   - **Amount**: Enter the expense amount (must be positive)
   - **Category**: Choose from: Food, Transportation, Entertainment, Shopping, Bills, or Other
   - **Description**: Add a brief description (required)
4. Click **"Add Expense"** to save

### Editing an Expense

1. Go to the Expenses page
2. Click the edit icon (pencil) next to any expense
3. Modify the fields as needed
4. Click **"Update Expense"** to save changes

### Deleting an Expense

1. Click the delete icon (trash) next to any expense
2. Confirm the deletion in the modal dialog
3. The expense will be permanently removed

### Filtering Expenses

Use the filter panel on the Expenses page to:
- **Search**: Enter keywords to search descriptions, categories, or amounts
- **Filter by Category**: Select a specific category or "All"
- **Date Range**: Set start and end dates to filter by date range
- **Clear Filters**: Click "Clear All" to reset all filters

### Exporting Data

1. Go to the Expenses page
2. Click the **"Export CSV"** button
3. A CSV file will be downloaded with all your current expenses

### Viewing Analytics

The Dashboard page provides:
- **Total Spending**: Sum of all expenses
- **This Month**: Total spending for the current month
- **Average Expense**: Average amount per expense
- **Top Category**: Your highest spending category
- **Category Breakdown**: Visual chart showing spending distribution
- **Recent Expenses**: List of your 5 most recent expenses

## 🏗️ Project Structure

```
expense-tracker/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Dashboard page
│   └── expenses/
│       └── page.tsx         # Expenses management page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── LoadingSpinner.tsx
│   ├── expenses/            # Expense-specific components
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── ExpenseFilters.tsx
│   │   └── ExportButton.tsx
│   ├── dashboard/           # Dashboard components
│   │   ├── SummaryCard.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   └── RecentExpenses.tsx
│   └── layout/              # Layout components
│       └── Navigation.tsx
├── lib/                     # Utility functions and hooks
│   ├── hooks/
│   │   └── useExpenses.tsx  # Main expense management hook
│   └── utils/
│       ├── localStorage.ts  # Local storage utilities
│       ├── currency.ts      # Currency formatting
│       ├── date.ts          # Date utilities
│       ├── validation.ts    # Form validation
│       └── export.ts        # CSV export
└── types/                   # TypeScript type definitions
    ├── expense.ts
    └── index.ts
```

## 🎨 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Data Persistence**: localStorage
- **Form Handling**: Custom validation with TypeScript
- **Date Handling**: Native JavaScript Date API

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Run production server

# Code Quality
npm run lint         # Run ESLint
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🎯 Categories

The app supports the following expense categories:
- 🍔 **Food**: Groceries, restaurants, dining
- 🚗 **Transportation**: Gas, public transit, parking
- 🎬 **Entertainment**: Movies, games, hobbies
- 🛍️ **Shopping**: Clothes, electronics, misc purchases
- 📄 **Bills**: Utilities, subscriptions, rent
- 📦 **Other**: Miscellaneous expenses

## 💾 Data Storage

All data is stored locally in your browser's localStorage. This means:
- ✅ Your data stays private and never leaves your device
- ✅ No server or database required
- ✅ Instant load times
- ⚠️ Data is specific to the browser and device
- ⚠️ Clearing browser data will delete your expenses

To backup your data, use the CSV export feature regularly.

## 🚀 Future Enhancements

Potential features for future versions:
- Cloud sync and backup
- Budget tracking and alerts
- Recurring expenses
- Multiple currency support
- Advanced charts and reports
- Receipt photo attachments
- Dark mode
- Multi-user support

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for a smooth, professional user experience.

---

**Happy Expense Tracking! 💰**