# Database Setup Guide

## Current Status: Development Mode ✅

The automated content generation system is currently running in **development mode** with in-memory storage. This means:

- ✅ **All features work** - articles, admin panel, API endpoints
- ✅ **Sample data included** - 2 featured articles ready to view
- ✅ **No database required** - perfect for testing and development
- ⚠️ **Data resets on restart** - articles are stored in memory only

## For Production: Vercel Postgres Setup

When you're ready to deploy to production with persistent data storage, follow these steps:

### 1. Create Vercel Postgres Database

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose a name for your database
6. Select a region close to your users
7. Click "Create"

### 2. Get Database Connection Details

After creating the database, Vercel will provide these environment variables:

```bash
POSTGRES_URL=postgres://username:password@host:port/database
POSTGRES_PRISMA_URL=postgres://username:password@host:port/database?pgbouncer=true&connect_timeout=15
POSTGRES_URL_NON_POOLING=postgres://username:password@host:port/database
POSTGRES_USER=username
POSTGRES_HOST=host
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=database
```

### 3. Update Environment Variables

Add these to your Vercel project environment variables:

1. Go to Project Settings → Environment Variables
2. Add each variable from step 2
3. Make sure to set them for "Production" environment

### 4. Update Database Code

Replace the in-memory storage in `src/lib/database.ts` with the Vercel Postgres implementation:

```typescript
// Replace the current implementation with:
import { sql } from '@vercel/postgres'

// Update all methods to use sql`...` queries instead of in-memory arrays
```

### 5. Deploy and Test

1. Deploy your project to Vercel
2. The cron jobs will automatically create the database tables
3. Test the article generation system

## Current Development Features

### What Works Now:
- ✅ **Featured Articles Page** (`/featured`) - View current articles
- ✅ **Article Archive** (`/archive`) - Browse all articles  
- ✅ **Article Detail Pages** (`/articles/[id]`) - Read full articles
- ✅ **Admin Panel** (`/admin`) - Manage article status
- ✅ **API Endpoints** - All CRUD operations
- ✅ **Sample Data** - 2 featured articles included

### Sample Articles Included:
1. **"Understanding Child Development Milestones"** - Child Development category
2. **"Positive Discipline Strategies for Toddlers"** - Parenting Strategies category

## Testing the System

### 1. View Featured Articles
Visit: `http://localhost:3000/featured`

### 2. Test Admin Panel
Visit: `http://localhost:3000/admin`
- Change article status (draft/featured/archived)
- Preview articles
- Test all management features

### 3. Test Article Generation
Visit: `http://localhost:3000/api/cron/generate-articles`
- This will generate 3 new draft articles
- Check the admin panel to see them

### 4. Test API Endpoints
```bash
# Get featured articles
curl http://localhost:3000/api/articles?status=featured

# Get specific article
curl http://localhost:3000/api/articles/sample_1

# Update article status (via admin panel)
```

## Migration to Production

When ready to move to production:

1. **Set up Vercel Postgres** (steps above)
2. **Update database.ts** to use Vercel Postgres
3. **Deploy to Vercel**
4. **Test all functionality**
5. **Set up monitoring** for the cron jobs

## Benefits of Current Setup

- **Fast development** - no database setup required
- **Easy testing** - all features work immediately
- **Sample data** - see the system in action
- **Full functionality** - test all admin and user features
- **Easy migration** - simple switch to production database

The system is fully functional in development mode and ready for production deployment when you're ready! 🚀
