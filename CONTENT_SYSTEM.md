# Automated Content Generation System

## Overview

This system automatically generates evidence-based articles on parenting and child development using AI, with a complete workflow from content creation to publication management.

## 🏗️ System Architecture

### Backend Components

1. **Database Layer** (`src/lib/database.ts`)
   - PostgreSQL integration via Vercel Postgres
   - Article and reference management
   - Status workflow (draft → featured → archived)

2. **Content Generation** (`src/lib/content-generator.ts`)
   - AI-powered article creation using OpenAI GPT-4
   - Credible source integration
   - Reference extraction and formatting

3. **Source Management** (`src/lib/sources.ts`)
   - Whitelist of credible academic sources
   - Search term optimization
   - Category classification

4. **Cron Jobs** (`src/app/api/cron/generate-articles/route.ts`)
   - Weekly automated article generation
   - Vercel Cron integration
   - Status management workflow

### Frontend Components

1. **Featured Articles** (`/featured`)
   - Display current featured articles
   - Card-based layout with metadata
   - Direct links to full articles

2. **Article Archive** (`/archive`)
   - Browse all archived articles
   - Search and filter functionality
   - Category-based organization

3. **Article Detail** (`/articles/[id]`)
   - Full article display with formatting
   - Reference section with external links
   - Related article suggestions

4. **Admin Panel** (`/admin`)
   - Article status management
   - Draft review and approval
   - Publication workflow control

## 🔄 Weekly Workflow

### Monday 7:00 AM (Automated)

1. **Content Generation**
   - AI selects 3 random topics from predefined list
   - Searches credible sources for each topic
   - Generates 500+ word articles with references
   - Saves articles as "draft" status

2. **Archive Management**
   - Identifies 3 oldest "featured" articles
   - Updates their status to "archived"
   - Makes room for new content

### Manual Review Process

1. **Admin Review** (`/admin`)
   - Review draft articles
   - Check content quality and accuracy
   - Approve for publication

2. **Status Updates**
   - Change "draft" → "featured" for publication
   - Articles appear on main site immediately
   - Full workflow tracking

## 📊 Database Schema

### Articles Table
```sql
CREATE TABLE articles (
  id VARCHAR(255) PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  publish_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'featured', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tags TEXT[] DEFAULT '{}',
  category VARCHAR(100) NOT NULL
);
```

### Article References Table
```sql
CREATE TABLE article_references (
  id VARCHAR(255) PRIMARY KEY,
  article_id VARCHAR(255) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  quote TEXT NOT NULL,
  domain VARCHAR(255) NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 Content Categories

- Child Development
- Parenting Strategies
- Mental Health
- Education
- Family Dynamics
- Health & Wellness
- Behavior Management
- Communication

## 🔍 Credible Sources

The system uses a whitelist of trusted academic and medical sources:

- Harvard University (harvard.edu)
- MIT (mit.edu)
- Stanford University (stanford.edu)
- American Psychological Association (apa.org)
- British Psychological Society (bps.org.uk)
- National Institutes of Health (nih.gov)
- Centers for Disease Control (cdc.gov)
- World Health Organization (who.int)
- UNICEF (unicef.org)
- American Academy of Pediatrics (pediatrics.org)

## 🚀 API Endpoints

### Public Endpoints
- `GET /api/articles?status=featured&limit=6` - Get featured articles
- `GET /api/articles?status=archived&limit=50` - Get archived articles
- `GET /api/articles/[id]` - Get specific article

### Admin Endpoints
- `PATCH /api/admin/articles/[id]/status` - Update article status
- `GET /api/cron/generate-articles` - Manual trigger (requires auth)

## 🛠️ Setup Instructions

### 1. Environment Variables
```bash
# Add to .env.local
OPENAI_API_KEY=your_openai_api_key
CRON_SECRET=your_secret_cron_key
POSTGRES_URL=your_vercel_postgres_url
POSTGRES_PRISMA_URL=your_vercel_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_vercel_postgres_non_pooling_url
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
```

### 2. Database Setup
The database tables are automatically created on first API call to the cron endpoint.

### 3. Vercel Deployment
1. Deploy to Vercel
2. Set up Vercel Postgres database
3. Configure environment variables
4. Cron jobs will automatically activate

## 📈 Content Quality Features

### AI-Generated Content
- **Minimum 500 words** per article
- **Evidence-based** content with citations
- **Professional tone** with practical advice
- **Structured format** with clear headings
- **Reference section** with external links

### Reference Management
- **Credible sources only** from whitelist
- **Quote extraction** from source material
- **External link validation**
- **Domain verification**

### Content Categorization
- **Automatic categorization** based on topic
- **Tag generation** for searchability
- **Metadata extraction** for organization

## 🔧 Admin Features

### Article Management
- **Status tracking** (draft/featured/archived)
- **Bulk operations** for status changes
- **Preview functionality** before publication
- **Search and filter** capabilities

### Quality Control
- **Human review** before publication
- **Content validation** and editing
- **Reference verification**
- **Publication scheduling**

## 🎨 UI/UX Features

### Design Consistency
- **Matches website color scheme** (rgb(24, 64, 46), rgb(218, 129, 108))
- **Consistent typography** (Gloock, Figtree)
- **Responsive design** for all devices
- **Card-based layouts** for easy scanning

### User Experience
- **Intuitive navigation** between sections
- **Search functionality** in archive
- **Category filtering** for organization
- **Loading states** and error handling

## 📱 Mobile Optimization

- **Responsive grid layouts**
- **Touch-friendly buttons**
- **Optimized typography** for mobile reading
- **Fast loading** with image optimization

## 🔒 Security Features

- **Cron job authentication** with secret keys
- **Input validation** for all forms
- **SQL injection prevention** with parameterized queries
- **Rate limiting** on API endpoints

## 📊 Analytics & Monitoring

### Content Metrics
- **Article view counts** (can be added)
- **User engagement** tracking
- **Search query analysis**
- **Category popularity**

### System Monitoring
- **Cron job execution** logs
- **Error tracking** and alerts
- **Database performance** monitoring
- **API response times**

## 🚀 Future Enhancements

### Planned Features
- **User comments** on articles
- **Article ratings** and feedback
- **Email notifications** for new content
- **Social sharing** integration
- **Advanced search** with filters
- **Content scheduling** for specific dates
- **Multi-language support**

### Technical Improvements
- **Caching layer** for better performance
- **CDN integration** for faster loading
- **Advanced analytics** dashboard
- **A/B testing** for content optimization
- **SEO optimization** for better discoverability

## 📞 Support

For technical issues or questions about the content generation system:

1. Check the admin panel for article status
2. Review cron job logs in Vercel dashboard
3. Verify database connectivity
4. Check OpenAI API key validity

## 🎯 Success Metrics

- **Weekly article generation** (3 articles)
- **Content quality** (500+ words, proper references)
- **User engagement** (article views, time on page)
- **Admin efficiency** (review and approval time)
- **System reliability** (uptime, error rates)

This automated content generation system provides a scalable, reliable way to maintain fresh, evidence-based content on your website while ensuring quality through human oversight and review processes.
