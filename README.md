# E-Learning Platform Frontend

A modern, responsive e-learning platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎓 Learning Management
- **Course Catalog**: Browse and search through available courses
- **Course Enrollment**: Enroll in courses with one-click
- **Progress Tracking**: Monitor your learning progress with detailed analytics
- **Lesson Management**: Access course lessons with interactive content
- **Certificates**: Earn certificates upon course completion

### 👤 User Management
- **Authentication**: Secure login and registration system
- **User Profiles**: Manage your profile and preferences
- **Role-based Access**: Support for Students, Instructors, and Admins
- **Dashboard**: Personalized dashboard with learning statistics

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Accessibility**: Built with accessibility best practices
- **Performance**: Optimized for fast loading and smooth interactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with shadcn/ui patterns
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend API running (see backend documentation)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-learning_platform/frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── courses/           # Course-related pages
│   ├── dashboard/         # User dashboard
│   ├── login/            # Authentication pages
│   ├── register/         # Registration page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── context/          # React context providers
│   └── lib/              # Utility functions
└── lib/                  # Library code
    └── api.ts            # API service layer
```

## Key Components

### Authentication
- **Login Page**: Secure authentication with email/password
- **Registration**: User registration with validation
- **Protected Routes**: Role-based access control

### Dashboard
- **Overview**: Learning statistics and recent activity
- **Progress Tracking**: Visual progress indicators
- **Recent Courses**: Quick access to enrolled courses
- **Upcoming Lessons**: Scheduled learning sessions

### Course Management
- **Course Catalog**: Browse and search courses
- **Course Details**: Detailed course information
- **Enrollment**: One-click course enrollment
- **Progress Tracking**: Track completion and progress

### User Interface
- **Responsive Navigation**: Mobile-friendly navigation
- **Modern Cards**: Clean card-based layouts
- **Interactive Elements**: Hover effects and transitions
- **Loading States**: Smooth loading indicators

## API Integration

The frontend integrates with the backend API through the `ApiService` class in `src/lib/api.ts`. Key endpoints include:

- **Authentication**: `/auth/login`, `/auth/register`
- **Courses**: `/courses`, `/courses/:id`
- **Enrollments**: `/enrollments`
- **Progress**: `/progress/:courseId`
- **User Profile**: `/profile`
- **Dashboard**: `/student-dashboard/*`

## Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

### Testing
```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Building for Production
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |
| `NEXTAUTH_SECRET` | NextAuth secret key | Required |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the backend repository
- Contact the development team

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS 