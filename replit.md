# BMI Insight - AI-Powered Health Calculator

## Overview

BMI Insight is an AI-enhanced Body Mass Index calculator that transforms clinical BMI calculations into an empowering health insight experience. The application provides personalized diet recommendations, health insights, and visualizations to help users understand and manage their body health. Built with a focus on clean design inspired by Apple Health's minimalism and Calm App's soothing aesthetic, the platform offers both light and dark themes with carefully crafted color palettes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack React Query for server state management and data fetching

**UI Component System:**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for smooth animations and transitions
- Three.js for 3D human model visualization of BMI categories

**Design System:**
- CSS variables-based theming system supporting light/dark modes
- Custom color palette with primary (blue-teal), secondary (green), and category-specific colors
- Typography stack: Poppins for headings, Inter for body text
- Gradient system for visual hierarchy and category indicators

**State Management:**
- React Context API for theme management (ThemeProvider)
- TanStack Query for asynchronous server state
- Local component state with React hooks

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for REST API endpoints
- ESM module system throughout the application
- Custom middleware for request logging and error handling

**API Structure:**
- `/api/users` - User registration and retrieval endpoints
- `/api/users/by-email/:email` - Fetch user by email
- `/api/bmi/calculate` - BMI calculation with diet recommendations
- Diet plan generation based on BMI category and activity level

**Data Validation:**
- Zod schemas for runtime type validation
- drizzle-zod integration for database schema validation
- Custom validation for BMI calculations and user inputs

### Database Architecture

**ORM & Database:**
- Drizzle ORM for type-safe database operations
- PostgreSQL via Neon serverless database
- WebSocket connection pooling for efficient database access

**Schema Design:**
- `users` table: Stores user profiles (id, name, email, age, gender, createdAt)
- `bmiRecords` table: Historical BMI calculations with foreign key to users (id, userId, height, weight, bmi, category, activityLevel, createdAt)
- One-to-many relationship: Users → BMI Records

**Data Storage Layer:**
- Storage abstraction pattern with IStorage interface
- DatabaseStorage implementation for all database operations
- Methods for user management and BMI record tracking

### Design Patterns

**Component Architecture:**
- Compound component pattern for complex UI elements (Cards, Forms, Dialogs)
- Presentational/Container component separation
- Custom hooks for reusable logic (use-mobile, use-toast)

**Code Organization:**
- Path aliases (@/ for client, @shared for shared types, @assets for static files)
- Shared schema between client and server for type safety
- Component examples directory for isolated development/testing

**Routing Strategy:**
- File-based page organization under `/pages`
- Client-side routing with Wouter
- Routes: Home (/), Calculator (/calculator), Diet Plan (/diet-plan), Insights (/insights), About (/about)

## External Dependencies

### Third-Party Services

**Database:**
- Neon Serverless PostgreSQL (@neondatabase/serverless) - Cloud PostgreSQL with WebSocket support
- Connection pooling via ws library for WebSocket connections
- Environment variable DATABASE_URL for connection string

**AI/ML (Planned):**
- Design mentions AI-powered insights and recommendations
- OpenAI integration indicated in package.json (@types/openai likely)
- AI tips generation for personalized health recommendations

### Key Libraries & Frameworks

**Frontend:**
- React & React DOM 18+
- @tanstack/react-query for data fetching
- Radix UI component primitives (20+ components)
- Framer Motion for animations
- Three.js for 3D visualizations
- Recharts for data visualization
- Wouter for routing
- date-fns for date manipulation

**Backend:**
- Express.js for HTTP server
- Drizzle ORM with PostgreSQL dialect
- Zod for schema validation
- connect-pg-simple for session management (indicated)

**Development Tools:**
- TypeScript for type safety
- ESBuild for production builds
- Vite with React plugin
- Replit-specific plugins (dev-banner, cartographer, runtime-error-modal)
- Tailwind CSS with PostCSS and Autoprefixer

**UI/Styling:**
- Tailwind CSS 3.x
- class-variance-authority for component variants
- clsx & tailwind-merge for className utilities
- Custom CSS variables for theming

### Build & Deployment

**Scripts:**
- `dev`: Development server with tsx for TypeScript execution
- `build`: Vite frontend build + ESBuild server bundle
- `start`: Production server execution
- `db:push`: Drizzle schema push to database

**Configuration:**
- Vite config with path aliases and Replit-specific plugins
- Tailwind config with custom theme extensions
- TypeScript strict mode with ESNext modules
- Drizzle config pointing to Neon PostgreSQL