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
- **Routing**: React Router v7 with protected routes
- **State Management**: 
  - React Query (TanStack Query) for server-state management
  - React Context API for authentication state
- **Form Management**: React Hook Form with custom form components
- **Styling**: SCSS with modular component-scoped styles
- **Linting**: ESLint with TypeScript support
- **Package Manager**: npm

## Project Structure

```
src/
├── pages/              # Top-level page components
│   ├── Login.tsx       # Login page with authentication
│   ├── Users.tsx       # Users dashboard
│   └── NotFound.tsx    # 404 page
├── components/         # Reusable UI components
│   ├── Layout/         # Main dashboard layout wrapper
│   ├── Header/         # Top navigation bar with hamburger menu
│   ├── Sidebar/        # Left navigation sidebar with mobile toggle
│   ├── ProtectedRoute/ # Route guard for authenticated pages
│   ├── Form/           # Reusable form components (Input, Select, Checkbox, Textarea)
│   └── Users/          # User-related components
│       ├── Users.tsx           # Users list view
│       ├── UsersTable.tsx       # Users table with sorting
│       ├── UserFilters.tsx      # Advanced filter controls with react-hook-form
│       ├── UserDetails.tsx      # Individual user profile
│       └── UserActions.tsx      # Action buttons per user
├── context/            # React Context for state management
│   └── AuthContext.tsx # Authentication state and logic
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
   - **Login System**: Email/password authentication with validation
   - **Session Persistence**: User session saved to localStorage
   - **Protected Routes**: Dashboard routes accessible only when authenticated
   - **Auth Context**: Centralized authentication state via React Context
   - Redirects unauthenticated users to login page

### 2. **Form Components System** (React Hook Form Integration)
   - **FormInput**: Text, email, password, tel, date inputs with validation
   - **FormSelect**: Dropdown selects with custom options
   - **FormCheckbox**: Checkbox inputs with label support
   - **FormTextarea**: Multi-line text inputs
   - **Features**:
     - Built-in error message display
     - Required field markers
     - Consistent styling across the app
     - Full TypeScript support with generics
     - Used in Login page and User Filters

### 3. **Users Management**
   - **List View**: Displays all users in a paginated table
   - **Advanced Filtering**: Filter users by organization, status, username, email, phone, and date using form components
   - **Real-time Search**: Find users as you type
   - **User Details**: View comprehensive user profile including:
     - Personal information (full name, email, phone, BVN)
     - Financial details (account number, tier, monthly income)
     - Employment information (status, sector, duration)
     - Social media profiles
     - Guarantor information

### 4. **Responsive Design**
   - **Mobile (< 768px)**:
     - Sidebar hidden by default with hamburger menu toggle
     - Search input hidden to save space
     - Hamburger icon transforms to X when opened
   - **Tablet (768px - 1024px)**:
     - Sidebar visible with hamburger menu available
     - User cards stacked 2 per row
     - Stats displayed in 2-column grid layout
   - **Desktop (> 1024px)**:
     - Full sidebar always visible
     - Full width layouts
     - Optimized spacing and typography

### 5. **Performance**
   - React Query for intelligent data caching and synchronization
   - Simulated 500ms network delay for realistic UX testing
   - Optimized bundle with Vite
   - Code splitting on routes

## Getting Started

### Prerequisites
- Node.js 18+ and npm installed

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

### Authentication Flow
1. User visits app → redirected to `/login` if not authenticated
2. User enters email and password
3. `useAuth()` hook validates credentials and sets `isAuthenticated` state
4. Session persisted to localStorage
5. User redirected to `/users` dashboard
6. Logout clears session and localStorage

### Form Components Usage

#### FormInput
```tsx
import { FormInput } from '@/components/Form'
import { useForm } from 'react-hook-form'

const { control } = useForm()

<FormInput<FormData>
  name="email"
  control={control}
  label="Email"
  type="email"
  placeholder="Enter email"
  required
/>
```

#### FormSelect
```tsx
import { FormSelect } from '@/components/Form'

const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

<FormSelect<FormData>
  name="status"
  control={control}
  label="Status"
  options={options}
/>
```

### Data Flow
1. User logs in via `/login` → Navigated to `/users`
2. `UsersPage` component manages state between list and detail views
3. `Users` component fetches data via `userService.fetchUsers()`
4. React Query caches results with 5-minute stale time
5. Click user to view details in `UserDetails` component
6. `UserFilters` uses react-hook-form to manage filter state in real-time

### Styling Approach
- **SCSS Modules**: Each component has a corresponding `.scss` file
- **Form Components**: Shared `Form.scss` with context-specific overrides in parent components
- **Variables**: Colors, spacing, and breakpoints in `_variables.scss`
- **Mixins**: Reusable styles (`input-base`, `flex-center`, `respond-to`) in `_mixins.scss`
- **Context Overrides**: Form components inherit base styles but can be overridden via `.form-group` selectors

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
- **Asset imports**: All images imported as variables (not inline paths)
- **Form management**: All forms use react-hook-form with custom form components
- **Styling**: Preferentially use existing SCSS variables and mixins to maintain consistency

## Troubleshooting

**Module not found errors**: Ensure all component exports are properly defined in index files (e.g., `components/index.ts`)

**Hot Module Replacement not working**: Clear `.vite` cache and restart dev server

**Build fails**: Run `npm run lint` to check for TypeScript errors before building
