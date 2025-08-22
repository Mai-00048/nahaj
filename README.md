![وصف الصورة](https://raw.githubusercontent.com/Mai-00048/nahaj/main/Screenshot%202025-08-22%20183117.png)


https://mai-alkalbani-test.netlify.app/



# 📁 Vision 2030 Project - Setup Guide

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

## Quick Setup

1. **Clone and install**
```bash
git clone <repository-url>
cd vision2030-project
npm install
```

2. **Environment setup**
   - Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Run the project**
```bash
npm run dev
```

4. **Open browser** → http://localhost:3000

## Available Scripts
```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
npm run lint   # Code linting
```

## Project Structure
- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Services & utilities
- `/public` - Static assets

Note: Internet connection required for dependency installation.
