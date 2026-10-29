# Personal Trainer

Front end for a personal trainer company's customer database, built with React and TypeScript.
Final project for the Front End Programming course (SOF004AS3AE-3008) at Haaga-Helia.
**Live demo:** https://thy-personaltrainer.netlify.app

## Features (Part 1)

- **Customers page**: list of all customers
- **Trainings page**: list of all trainings with the customer's name and the date formatted as `dd.mm.yyyy hh:mm`
- **Sorting**: click any column header
- **Searching**: a search field that matches all columns, plus a filter under each column header
- **Navigation**: tabs in the top bar, with a separate URL for each page (`/customers`, `/trainings`)
- Error message if the data cannot be loaded

## Features (Part 2)

- **Add and edit customers** in a form dialog, with a "Required" message under each empty field
- **Delete customers** with a Yes/No confirmation dialog that warns that the customer's trainings are deleted too
- **Add a training to a customer** from the customer list, with a date and time picker (`dd.mm.yyyy hh:mm`, 24-hour clock)
- **Delete trainings** with the same reusable Yes/No confirmation dialog
- Notification after every add, edit and delete

## Features (Part 3)

- **Export customers to CSV**, with only the data columns (no button columns)
- **Calendar page** showing all trainings in month, week and day views
- **Deployed to Netlify**, with automatic deploys on every push to `main`

## Tech stack

- React + TypeScript + Vite
- [Material UI](https://mui.com/) – app bar, tabs, inputs
- [AG Grid](https://www.ag-grid.com/) – data tables with sorting, filtering and pagination
- [React Router](https://reactrouter.com/) – navigation
- [Day.js](https://day.js.org/) – date formatting
- [MUI X Date Pickers](https://mui.com/x/react-date-pickers/) – date and time picker
- [FullCalendar](https://fullcalendar.io/) – training calendar

## Project structure

```
src/
├── api.ts                     # REST API calls
├── types.ts                   # TypeScript types for customers and trainings
├── utils.ts                   # Date formatting helper
├── App.tsx                    # Layout: app bar and navigation tabs
├── main.tsx                   # Routes and app start-up
└── components/
    ├── CustomerList.tsx       # Customers page
    └── TrainingList.tsx       # Trainings page
```

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## REST API

[Personal Trainer REST API documentation](https://juhahinkula.github.io/personaltrainerdocs/)
