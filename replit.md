# PropManage - Real Estate Management Platform

## Overview

PropManage is a comprehensive real estate management application that enables property listing, browsing, and portfolio management. The platform features a public-facing property marketplace and an administrative dashboard for property management. Users can browse luxury properties with rich visual presentation, while administrators have full CRUD capabilities for managing the property database.

The application follows a modern full-stack architecture with a React frontend and Express backend, utilizing PostgreSQL for data persistence and session management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (chosen over React Router for smaller bundle size)
- TanStack Query (React Query) for server state management with automatic caching and refetching

**UI Component System**
- shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette supporting light/dark themes with CSS variables
- Design inspired by Zillow, Redfin, and Airbnb for property presentation; Linear for dashboard interfaces
- Comprehensive component set including forms, dialogs, tables, cards, and navigation elements

**State Management Strategy**
- Server state managed through React Query with configurable cache policies
- Authentication state provided via React Context (AuthContext)
- Theme state managed through ThemeProvider context
- Form state handled by React Hook Form with Zod validation

**Key Frontend Patterns**
- Protected routes using custom ProtectedRoute component that checks authentication status
- Role-based UI rendering (admin vs. regular user dashboards)
- Optimistic updates and automatic cache invalidation after mutations
- Separation of concerns with dedicated hooks (useAuth, useTheme, useIsMobile)

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server with middleware-based request handling
- RESTful API design with conventional HTTP methods and status codes
- Session-based authentication using Passport.js with Local Strategy
- Custom middleware for authentication (`requireAuth`) and authorization (`requireAdmin`)

**API Structure**
- Public endpoints: GET /api/properties, GET /api/properties/:id
- Protected endpoints: POST /api/properties (admin only), PUT/DELETE /api/properties/:id (admin only)
- Authentication endpoints: POST /api/login, POST /api/register, POST /api/logout, GET /api/user
- Consistent error handling with appropriate HTTP status codes

**Data Access Layer**
- Storage abstraction pattern (IStorage interface) allowing for potential database swapping
- DatabaseStorage implementation using Drizzle ORM for type-safe database operations
- All database queries encapsulated within the storage layer, keeping route handlers clean

**Authentication & Security**
- Password hashing using bcryptjs with configurable salt rounds (10)
- Session management with express-session and connect-pg-simple for PostgreSQL-backed sessions
- Role-based access control (user vs. admin roles)
- CSRF protection through session configuration

### Data Layer

**Database Technology**
- PostgreSQL via Neon serverless driver for scalable cloud-native database access
- WebSocket-based connection pooling for efficient connection management
- Drizzle ORM providing type-safe query building and schema management

**Schema Design**
- Users table: Stores authentication credentials, role (user/admin), and profile information
- Properties table: Comprehensive property data including address, pricing, features, and metadata
- Relational design with foreign key from properties.createdBy to users.id
- UUID primary keys for security and scalability
- Array type for property features, enabling flexible amenity storage

**Data Validation**
- Zod schemas (drizzle-zod integration) for runtime validation on both client and server
- Type inference from database schema to ensure consistency
- Validation at API boundaries prevents invalid data from reaching the database

### Development & Build Pipeline

**Development Environment**
- Hot module replacement via Vite for rapid frontend development
- tsx for running TypeScript server code without compilation step
- Concurrent development: Vite dev server proxies API requests to Express backend
- Environment variables managed through .env files (DATABASE_URL, SESSION_SECRET)

**Production Build**
- Frontend: Vite builds optimized static assets to dist/public
- Backend: esbuild bundles server code with external packages to dist/
- Single deployment artifact containing both frontend and backend
- Static file serving handled by Express in production mode

**Type Safety**
- Shared types between client and server via @shared directory
- TypeScript strict mode enabled across the entire codebase
- Path aliases for clean imports (@/, @shared/, @assets/)

## External Dependencies

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket support for efficient connection management
- **connect-pg-simple**: PostgreSQL session store for persistent user sessions

### Authentication
- **Passport.js**: Authentication middleware with Local Strategy for username/password authentication
- **bcryptjs**: Password hashing library for secure credential storage

### UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-styled component layer built on Radix UI following design system principles
- **Lucide React**: Icon library for consistent iconography

### Frontend Tooling
- **React Hook Form**: Form state management with performance optimization
- **Zod**: Schema validation for forms and API data
- **@hookform/resolvers**: Integration layer between React Hook Form and Zod
- **TanStack Query**: Server state management with caching, background updates, and optimistic UI
- **Tailwind CSS**: Utility-first CSS framework
- **date-fns**: Date manipulation and formatting

### Build Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for backend code
- **TypeScript**: Type system for JavaScript
- **Drizzle Kit**: Database migration tool and schema management

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development mode indicator