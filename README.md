# MediBook - Healthcare Management Platform (Client)

MediBook is a comprehensive healthcare management platform designed to connect patients with doctors. It streamlines the process of booking appointments, managing schedules, reviewing doctors, and reading medical blogs.

This directory contains the frontend client application built with modern web technologies.

## Technology Stack

- React 19: UI Library
- Vite: Fast frontend build tool
- Redux Thunk: State management and asynchronous logic
- React Router DOM: Client-side routing
- Tailwind CSS: Utility-first styling framework
- Lucide React: Iconography
- Axios: HTTP client for API requests

## Features

1. Public Interface
   - Landing Page: High-quality, premium design to attract patients and doctors.
   - Doctor Search: Filter doctors by specialization and keyword.
   - Blog System: Read articles related to health and wellness.

2. Patient Portal
   - Book and manage appointments.
   - View detailed doctor profiles, including fees, address, and experience.
   - Leave reviews and ratings for doctors.
   - Manage personal profile information.

3. Doctor Dashboard
   - View an overview of daily statistics and patient volume.
   - Manage appointments (Booked, Completed, Cancelled).
   - Dynamic schedule viewer.
   - Professional public profile presentation.

4. Admin Dashboard
   - Complete system oversight.
   - Manage the list of doctors (add, remove, view details).
   - View all system-wide appointments.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:5173.

### Building for Production

To create a production-ready build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

## Folder Structure

- /src/assets: Static assets like images and global styles.
- /src/components: Reusable UI components (buttons, navbar, footer, cards).
- /src/hooks: Custom React hooks.
- /src/layouts: Layout wrappers for different portals (MainLayout, DoctorLayout, AdminLayout).
- /src/pages: Page-level components corresponding to application routes.
- /src/routes: Configuration for React Router, including protected routes.
- /src/services: Axios configuration and API helpers.
- /src/store: Redux actions, reducers, and types.

## Configuration

The application uses an Axios instance configured in src/services/api.js. It points to the MediBook REST API. Make sure the backend server is running and the baseURL is correctly set for your environment.

## Deployment

This project includes a vercel.json file pre-configured for deployment on Vercel. It handles the necessary rewrites so that React Router operates correctly without throwing 404 errors on direct navigation.
