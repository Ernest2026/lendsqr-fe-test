# Lendsqr Frontend Test

A modern React-based user management dashboard application for Lendsqr. This application provides a comprehensive interface for viewing, filtering, and managing users with detailed user profiles.

## Overview

This is a **single-page application (SPA)** built with React and TypeScript that demonstrates:
- User authentication with a login page
- A paginated users list with advanced filtering capabilities
- Detailed user profile views with personal and financial information
- Responsive layout with sidebar navigation
- Modern data fetching patterns using React Query

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (fast dev server and optimized builds)
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query) for server-state management
- **Styling**: SCSS with modular component-scoped styles
- **Linting**: ESLint with TypeScript support
- **Package Manager**: npm

## Project Structure

```
src/
├── pages/              # Top-level page components
│   ├── Login.tsx       # Login page
│   ├── Users.tsx       # Users dashboard
│   └── NotFound.tsx    # 404 page
├── components/         # Reusable UI components
│   ├── Layout/         # Main dashboard layout wrapper
│   ├── Header/         # Top navigation bar
│   ├── Sidebar/        # Left navigation sidebar
│   └── Users/          # User-related components
│       ├── Users.tsx           # Users list view
│       ├── UsersTable.tsx       # Users table with sorting
│       ├── UserFilters.tsx      # Filter controls
│       ├── UserDetails.tsx      # Individual user profile
│       └── UserActions.tsx      # Action buttons per user
├── services/           # API/data services
│   └── userService.ts  # User data fetching logic
├── styles/             # Global SCSS utilities
│   └── abstracts/      # Variables, mixins, functions
├── data/               # Static data
│   └── users.json      # Mock user data
└── const/              # Application constants
    └── sidebar.ts      # Sidebar menu configuration
```

## Key Features

### 1. **Authentication**
   - Simple login page with email and password fields
   - Routes to users dashboard on successful login
   - Session state persisted through app navigation

### 2. **Users Management**
   - **List View**: Displays all users in a paginated table
   - **Filtering**: Filter users by organization, status, or custom criteria
   - **Search**: Find users by email, username, or phone number
   - **User Details**: View comprehensive user profile including:
     - Personal information (full name, email, phone, BVN)
     - Financial details (account number, tier, monthly income)
     - Employment information (status, sector, duration)
     - Social media profiles
     - Guarantor information

### 3. **Responsive Design**
   - Sidebar navigation for easy access to sections
   - Header with branding and user controls
   - Mobile-friendly layout (SCSS media queries)
   - Consistent styling using SCSS variables and mixins

### 4. **Performance**
   - React Query for intelligent data caching and synchronization
   - Simulated 500ms network delay for realistic UX testing
   - Optimized bundle with Vite

## Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

5. **Run linter**
   ```bash
   npm run lint
   ```

## How It Works

### Data Flow
1. User logs in via `/login` → Navigated to `/users`
2. `UsersPage` component manages state between list and detail views
3. `Users` component fetches data via `userService.fetchUsers()`
4. React Query caches results with 5-minute stale time
5. Click user to view details in `UserDetails` component

### Styling Approach
- **SCSS Modules**: Each component has a corresponding `.scss` file
- **Variables**: Colors, spacing, and breakpoints in `_variables.scss`
- **Mixins**: Reusable styles in `_mixins.scss`
- **Functions**: Helper functions in `_functions.scss`

### React Query Configuration
```typescript
- refetchOnWindowFocus: false  // Don't refetch when tab regains focus
- retry: 1                      // Retry failed requests once
- staleTime: 5 minutes         // Data considered fresh for 5 min
```

## Data Source

Currently, the application uses **mock data** loaded from `src/data/users.json`. To integrate with a real API:

1. Update `fetchUsers()` in `userService.ts` to use actual API endpoints
2. Replace the JSON file loading with API calls (e.g., using `fetch` or `axios`)
3. React Query will handle caching and state management automatically

## Environment

- **Node version**: Recommended 18+ for best compatibility
- **Target browsers**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Build output**: `dist/` folder (created after running `npm run build`)

## Development Notes

- **TypeScript**: Strict mode enabled for type safety
- **File aliases**: Use `@/` prefix for imports from `src/` (configured in `vite.config.ts`)
- **Component naming**: PascalCase for components, camelCase for utilities
- **Styling**: Preferentially use existing SCSS variables to maintain consistency

## Troubleshooting

**Module not found errors**: Ensure all component exports are properly defined in index files (e.g., `components/index.ts`)

**Hot Module Replacement not working**: Clear `.vite` cache and restart dev server

**Build fails**: Run `npm run lint` to check for TypeScript errors before building
