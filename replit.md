# BookKaroIndia - Experience Booking Platform

## Overview

BookKaroIndia is a full-stack booking platform for experiences across India, built with React, Express, and PostgreSQL. The application allows users to discover, search, and book various experiences including adventure tours, cultural experiences, wildlife safaris, and more. The platform features a modern UI built with shadcn/ui components and follows Material Design principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Design System**: Material Design approach with custom color palette and typography
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with modular route organization
- **Data Layer**: Storage abstraction pattern with in-memory implementation (easily swappable)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with Vite integration for seamless full-stack development

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Core Entities**:
  - Users: Authentication and user management
  - Experiences: Bookable experiences with rich metadata (pricing, ratings, categories, locations)
  - Bookings: Customer bookings with status tracking and payment information
- **Data Types**: Support for JSON fields (inclusions, exclusions, highlights), decimal precision for pricing, and comprehensive timestamp tracking

### UI/UX Design System
- **Theme**: Dual light/dark mode support with CSS custom properties
- **Typography**: Inter font family with modular scale (1.25 ratio)
- **Color System**: HSL-based with semantic color tokens and automatic border generation
- **Component Architecture**: Radix UI primitives with custom styling via class-variance-authority
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Data Management
- **Query Strategy**: TanStack Query for caching, synchronization, and optimistic updates
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Error Handling**: Global error boundaries and toast notifications
- **Loading States**: Skeleton components and loading indicators

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Routing**: Wouter for lightweight routing
- **Backend**: Express.js, CORS middleware, dotenv for environment management

### Database & ORM
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with migrations support
- **Connection**: @neondatabase/serverless for serverless database connections
- **Session Storage**: connect-pg-simple for PostgreSQL session management

### UI Components & Styling
- **Component Library**: Radix UI primitives (25+ components)
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icon library
- **Utility Libraries**: clsx, tailwind-merge for conditional styling
- **Variant Management**: class-variance-authority for component variants

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full TypeScript support across client and server
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Replit Integration**: Cartographer plugin for Replit development environment

### Validation & Utilities
- **Schema Validation**: Zod for runtime type checking and validation
- **Date Handling**: date-fns for date manipulation and formatting
- **Development Utilities**: @jridgewell/trace-mapping for source map support