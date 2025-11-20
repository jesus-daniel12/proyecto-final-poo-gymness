# Gymness - Fitness Management System

A comprehensive full-stack application for managing fitness clients, trainers, routines, and workout sessions.

## Features

### Admin Features
- **Client Management** - Create, read, update, and delete clients
- **Professional Management** - Manage trainers and specialists
- **Plans Management** - Create and manage service plans
- **Exercises Library** - Build and maintain exercise database
- **Dashboard** - Real-time statistics and overview

### Professional Features
- **Routine Management** - Create and manage workout routines for clients
- **Session Management** - Plan and track workout sessions
- **Client Routines** - View all assigned client routines
- **Session Tracking** - Monitor session status and exercises

### Client Features
- **My Routines** - View assigned workout routines
- **Session Details** - View detailed session information with exercises
- **Progress Tracking** - Track completed sessions and exercises
- **Profile** - View personal information

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **State Management**: React Context API
- **API Client**: Axios with JWT authentication
- **Error Handling**: Comprehensive error utilities and components
- **Development**: TypeScript strict mode, ESLint

## Project Structure

\`\`\`
app/
├── layout.tsx                 # Root layout
├── dashboard/                 # Dashboard pages
│   ├── page.tsx              # Main dashboard
│   ├── perfil/               # User profile
│   ├── clientes/             # Client management (admin)
│   ├── profesionales/        # Professional management (admin)
│   ├── planes/               # Plan management (admin)
│   ├── ejercicios/           # Exercise management (admin)
│   ├── rutinas/              # Routine management (professional)
│   ├── sesiones/             # Session management (professional)
│   ├── mis-rutinas/          # Client routines (client)
│   └── mis-sesiones/         # Client sessions (client)
├── login/                     # Authentication
├── register/                  # User registration
└── error.tsx                  # Error handling

components/
├── auth/                      # Authentication components
├── layout/                    # Layout components (navbar, sidebar)
├── common/                    # Reusable components
│   ├── data-table.tsx        # Data table component
│   ├── loading-spinner.tsx   # Loading states
│   ├── error-alert.tsx       # Error notifications
│   ├── success-alert.tsx     # Success notifications
│   ├── error-boundary.tsx    # Error boundary
│   └── empty-state.tsx       # Empty state UI
└── ui/                       # shadcn/ui components

services/
├── auth.service.ts           # Authentication
├── cliente.service.ts        # Client operations
├── profesional.service.ts    # Professional operations
├── plan.service.ts           # Plan operations
├── ejercicio.service.ts      # Exercise operations
├── rutina.service.ts         # Routine operations
└── sesion.service.ts         # Session operations

types/
├── auth.types.ts             # Authentication types
├── cliente.types.ts          # Client types
├── profesional.types.ts      # Professional types
├── plan.types.ts             # Plan types
├── ejercicio.types.ts        # Exercise types
├── rutina.types.ts           # Routine types
└── sesion.types.ts           # Session types

utils/
├── error-handler.ts          # Error utilities
└── formatters.ts             # Data formatters

hooks/
├── use-auth.ts               # Authentication hook
├── use-async.ts              # Async operations hook
└── use-form-error.ts         # Form error hook
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your API URL:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8080
\`\`\`

### Running the Application

Development:
\`\`\`bash
npm run dev
\`\`\`

Production build:
\`\`\`bash
npm run build
npm start
\`\`\`

## API Configuration

The application connects to a backend API. Configure the base URL in `.env.local`:

\`\`\`
NEXT_PUBLIC_API_URL=http://your-api-url:port
\`\`\`

## Authentication

The application uses JWT-based authentication:
- Users log in with email and password
- JWT token is stored in localStorage
- Token is automatically included in API requests
- Expired sessions redirect to login

## Role-Based Access Control

Three user roles with different permissions:

| Feature | Admin | Professional | Client |
|---------|-------|--------------|--------|
| Manage Clients | ✓ | | |
| Manage Professionals | ✓ | | |
| Manage Plans | ✓ | | |
| Manage Exercises | ✓ | | |
| Create Routines | | ✓ | |
| Create Sessions | | ✓ | |
| View Assigned Routines | | | ✓ |
| View Sessions | | | ✓ |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Best Practices

- Use TypeScript for type safety
- Component error handling with try-catch
- Proper loading and error states
- Semantic HTML with ARIA attributes
- Mobile-first responsive design

## Deployment

The application is optimized for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## Security

- Environment variables for sensitive data
- JWT token authentication
- CORS headers configured
- Input validation and sanitization
- Error messages don't expose sensitive info
- Protected routes with role-based access

## Contributing

Guidelines for contributing:
- Follow the existing code structure
- Use TypeScript for type safety
- Test features thoroughly
- Update documentation
- Submit pull requests with clear descriptions

## License

This project is proprietary software.
