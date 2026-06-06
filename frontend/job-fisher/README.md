# upHunt - Job Board Frontend

A modern, responsive job board application built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Job Search**: Search jobs by title, company, or keywords
- 🎯 **Advanced Filters**: Filter by location, job type, remote status, and salary
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface
- ⚡ **Fast Performance**: Built with Vite for optimal performance

## Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **Lucide React**: Icons

## Getting Started ---

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── data/          # Mock data
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Features Overview

### Home Page

- Job search with real-time filtering
- Sidebar filters for job type, location, remote status, and salary
- Job listings with key information
- Responsive grid layout

### Job Detail Page

- Full job description
- Requirements list
- Application button
- Related information

## Customization

- Modify `src/data/mockJobs.ts` to add or update job listings
- Update colors in `tailwind.config.js`
- Customize components in `src/components/`

## License

MIT
