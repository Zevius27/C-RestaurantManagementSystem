# Restaurant Management System (RMS)

A comprehensive platform for managing restaurant operations including orders, menu, customers, and analytics.

## Features

- Dashboard with key business metrics
- Order management system
- Menu management
- Customer database
- Settings and customization

## Tech Stack

- React 19+
- React Router v7
- Zustand for state management
- Chakra UI for components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

The project follows a modular architecture:

- `src/app`: Global state and theme
- `src/components`: Reusable UI components
- `src/layouts`: Page layouts
- `src/pages`: Feature pages, each with its own components
- `src/router`: Routing configuration
- `src/utils`: Utility functions
- `src/hooks`: Custom React hooks

## Development

Each page is isolated with its own components folder, making it easy to work on features independently.

## Deployment

This project can be easily deployed using Vercel or Netlify.
