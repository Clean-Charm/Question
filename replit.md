# Random Page Web App

## Overview

This is a Korean-language mobile-optimized web application that provides a random page navigation experience. The app features a simple main interface with a prominent button that randomly selects and navigates to one of 50 predefined pages. It includes an intro overlay with loading animation, background music functionality, and a clean, responsive design optimized for mobile devices with a 16:9 aspect ratio.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Mobile Optimization**: Responsive design with 16:9 aspect ratio constraints and viewport meta tags

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful endpoints for page management
- **Development Mode**: Vite middleware integration for hot module replacement
- **Static Assets**: Express static file serving for production builds
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Development Storage**: In-memory storage implementation for development/testing
- **Schema**: Simple pages table with id, pageNumber, title, and content fields
- **Migrations**: Drizzle Kit for database schema management and migrations

### Component Design Patterns
- **UI Library**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Custom Components**: IntroOverlay for loading animation, MusicPlayer for audio controls
- **Hook Pattern**: Custom useAudio hook for music playback management
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

### Audio Integration
- **Music System**: HTML5 Audio API with custom useAudio hook
- **User Interaction**: Click-to-play music toggle with visual feedback
- **Audio Controls**: Volume control and loop functionality built-in

### Development Environment
- **Hot Reload**: Vite development server with React Fast Refresh
- **Type Safety**: Comprehensive TypeScript configuration across client, server, and shared modules
- **Code Quality**: ESModule format throughout the application
- **Build Process**: Separate client and server build processes with esbuild for server bundling

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service (@neondatabase/serverless)
- **Connection**: PostgreSQL connection via DATABASE_URL environment variable

### UI and Styling
- **Radix UI**: Comprehensive primitive component library for accessible UI components
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Class Variance Authority**: For component variant management
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Drizzle Kit**: Database migration and schema management tool
- **Vite Plugins**: Runtime error overlay, development banner, and cartographer for Replit integration
- **React Query**: Server state management and caching library

### Form and Validation
- **React Hook Form**: Form state management with @hookform/resolvers
- **Zod**: Runtime type validation and schema definition
- **Drizzle Zod**: Integration between Drizzle ORM and Zod validation

### Audio and Media
- **HTML5 Audio API**: Native browser audio playback capabilities
- **BGM Integration**: Background music file serving through Express static routes

### Deployment and Hosting
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Environment Variables**: DATABASE_URL for production database connection
- **Build Output**: Static client build with Node.js server deployment