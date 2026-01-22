# Task Management Dashboard

A modern, production-ready task management application built with Next.js 16+ and TypeScript, featuring a beautiful glassmorphism design with dark/light mode support.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify)

## 🌐 Live Demo

**🔗 [View Live Application on Netlify](https://taskflow-taskmanagerweb.netlify.app/)**



---

## ✨ Features

- 🎨 **Modern Glassmorphism Design** - Beautiful UI with smooth animations and depth effects
- 🌓 **Dark/Light Mode** - System preference detection with manual toggle
- 🔍 **Advanced Search & Filtering** - Real-time search with filters by status, priority, and date
- 📊 **Task Statistics** - Dashboard with animated stats cards showing task completion trends
- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks with optimistic UI updates
- 🏷️ **Priority & Status Management** - Organize tasks with 4 priority levels and 3 status types
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 💾 **Local Storage Persistence** - Tasks are saved locally in your browser
- 🎯 **Toast Notifications** - Success/error feedback for all actions
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and optimized renders

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
```bash
git clone <https://github.com/Suyash-Sahu/TaskFlow.git>
cd task-management-dashboard
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 🛠️ Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **State Management:** React Hooks + Context API
- **Storage:** LocalStorage
- **Deployment:** Netlify

## 📁 Project Structure

```
task-management-dashboard/
├── app/
│   ├── api/
│   │   └── tasks/          # API routes for task CRUD
│   ├── tasks/
│   │   ├── [id]/           # Task details & edit pages
│   │   ├── new/            # Create task page
│   │   └── page.tsx        # Tasks list page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard page
│   └── globals.css         # Global styles & design system
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── tasks/              # Task-related components
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Theme & Toast providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, types, data management
├── public/                 # Static assets
├── netlify.toml            # Netlify configuration
└── .nvmrc                  # Node version specification
```

## 🎨 Design System

The application follows a comprehensive design system with:

- **Color Palette:** Light and dark mode variants with semantic color tokens
- **Typography:** Inter font family with consistent sizing scale
- **Components:** Reusable UI components with variants
- **Animations:** Smooth transitions and micro-interactions
- **Accessibility:** WCAG 2.1 AA compliant with keyboard navigation

## 📱 Pages

### Dashboard (`/`)
- Task statistics overview
- Recent tasks preview
- Quick action buttons
- Completion rate visualization

### Tasks List (`/tasks`)
- Comprehensive task list with grid/list view toggle
- Advanced search and filtering
- Sorting by date, priority, or title
- Real-time search functionality

### Task Details (`/tasks/[id]`)
- Full task information display
- Inline status and priority updates
- Related metadata and timestamps

### Create/Edit Task (`/tasks/new`, `/tasks/[id]/edit`)
- Form with validation
- Priority and status selection
- Due date picker
- Tags support

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Features in Detail

### Task Management
- Create tasks with title, description, priority, status, due date, and tags
- Update any task field with optimistic UI updates
- Delete tasks with confirmation dialog
- Filter by status (Todo, In Progress, Completed)
- Filter by priority (Low, Medium, High, Urgent)
- Search by title or description
- Sort by creation date, due date, priority, or title

### Theme System
- Automatic system preference detection
- Manual light/dark mode toggle
- Smooth theme transitions
- Persistent theme preference

### User Experience
- Toast notifications for all actions
- Empty states with helpful messages
- Loading states and skeleton loaders
- Responsive design for all screen sizes
- Keyboard navigation support

## 📦 Deployment

### 🌐 Deploy to Netlify

This project is pre-configured for easy deployment on Netlify:

#### Quick Deploy (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Build Settings (auto-detected):**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`

4. **Deploy:**
   - Netlify will automatically detect the `netlify.toml` configuration
   - Click "Deploy site"
   - Your site will be live in minutes!

5. **Update Live Link:**
   - After deployment, update the live demo link at the top of this README
   - Your Netlify URL will be: `https://your-site-name.netlify.app`

#### Manual Deployment via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

#### Netlify Configuration

The project includes `netlify.toml` with optimal settings:
- Node.js 20 runtime
- Next.js plugin configuration
- Automatic build optimization

### Other Deployment Options

You can also deploy to:
- **[Vercel](https://vercel.com)** - Zero-config Next.js deployment
- **AWS Amplify** - AWS hosting solution
- **Railway** - Simple cloud platform
- **Render** - Modern cloud platform

## 🎯 Performance

- ⚡ **Fast Initial Load** - Optimized bundle size
- 🚀 **Code Splitting** - Automatic route-based splitting
- 💨 **Lazy Loading** - Components loaded on demand
- 🎨 **Optimized Images** - Next.js Image optimization
- 📦 **Tree Shaking** - Unused code elimination

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built as a portfolio project demonstrating modern web development practices.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Netlify for seamless deployment
- The open-source community for inspiration

---

<div align="center">

**Made with ❤️ using Next.js 16+**



</div>
