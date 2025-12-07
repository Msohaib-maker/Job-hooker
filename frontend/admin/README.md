# Admin Dashboard - Job Scrapper

A modern, dark-themed admin dashboard for managing job postings.

## Features

- 🎨 **Dark Theme** - Beautiful dark UI with smooth transitions
- 📝 **Create Jobs** - Form to input all Job model fields:
  - Title (required)
  - Company
  - Location
  - Description
  - Creation Date
- 📋 **Job List** - View all jobs in a card-based grid layout
- 🔍 **Search** - Filter jobs by title, company, or location
- ✨ **Modern UI** - Built with React, TypeScript, Tailwind CSS, and Lucide icons

## Getting Started

### Installation

```bash
cd frontend/admin
npm install
```

### Configuration

Create a `.env` file in the `frontend/admin` directory:

```env
VITE_API_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your backend API URL.

### Development

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3001`

### Build

```bash
npm run build
```

## API Integration

The dashboard is configured to work with the backend API endpoint:
- `POST /admin/jobs` - Create new jobs

Make sure your backend is running and the API URL is correctly configured in the `.env` file.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

