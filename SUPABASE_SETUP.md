# Supabase Database Setup - Save My Time

Complete database configuration and optimization guide.

## 📋 Setup Order

Run these SQL scripts in the Supabase SQL Editor in this exact order:

### 1. Performance Optimizations
**File**: `supabase/sql/02_performance_optimizations.sql`

This script adds:
- Database indexes for faster queries
- Helper functions for role checking
- Auto-update triggers for timestamps
- Full-text search capabilities

**How to run**:
1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/tlbodqvutqxfezgmwqmc/sql)
2. Create new query
3. Copy and paste contents of `supabase/sql/02_performance_optimizations.sql`
4. Click "Run"

### 2. Analytics Views
**File**: `supabase/sql/03_analytics_views.sql`

This script creates:
- Lead conversion funnel view
- Daily statistics views
- Agent performance tracking
- Growth analytics functions

**How to run**:
1. In Supabase SQL Editor
2. Create new query
3. Copy and paste contents of `supabase/sql/03_analytics_views.sql`
4. Click "Run"

### 3. Admin User Setup
**File**: `supabase/sql/01_admin_setup.sql`

Sets up admin role for info@savemytime.dev

**IMPORTANT**: Run this AFTER signing up with info@savemytime.dev in the app!

**How to run**:
1. First, sign up at https://glasov-agent-bg-main.vercel.app/auth with email: info@savemytime.dev
2. Then, in Supabase SQL Editor
3. Copy and paste contents of `supabase/sql/01_admin_setup.sql`
4. Click "Run"

## 🎯 Quick Admin Setup

If you just want to set up the admin user quickly:

```sql
-- Run this after signing up with info@savemytime.dev
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'info@savemytime.dev'
ON CONFLICT (user_id, role) DO NOTHING;
```

## ✅ Verification Queries

### Check Admin Status
```sql
SELECT
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'info@savemytime.dev';
```

### Check Indexes
```sql
SELECT
  tablename,
  indexname,
  pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Check Views
```sql
SELECT
  schemaname,
  viewname
FROM pg_views
WHERE schemaname = 'public'
ORDER BY viewname;
```

### View Analytics
```sql
-- Lead funnel
SELECT * FROM public.lead_funnel;

-- Daily stats
SELECT * FROM public.daily_lead_stats LIMIT 10;

-- Agent performance
SELECT * FROM public.agent_performance;
```

## 🚀 Database Functions

After running the scripts, you'll have access to:

### `get_user_role(user_uuid)`
Returns the role of a user (admin or client)

```sql
SELECT public.get_user_role('YOUR_USER_ID_HERE');
```

### `is_admin(user_uuid)`
Checks if a user is an admin

```sql
SELECT public.is_admin(auth.uid());
```

### `get_leads_by_date_range(start_date, end_date)`
Get lead statistics for a date range

```sql
SELECT * FROM public.get_leads_by_date_range('2024-01-01', '2024-12-31');
```

### `get_top_lead_sources(limit)`
Get top lead sources

```sql
SELECT * FROM public.get_top_lead_sources(5);
```

### `get_monthly_growth()`
Get monthly growth statistics

```sql
SELECT * FROM public.get_monthly_growth();
```

## 📊 Performance Improvements

After running the optimization scripts, you'll see:

✅ **Faster queries** - Indexes on all frequently queried columns
✅ **Full-text search** - Search leads and profiles by name, email, company
✅ **Auto-timestamps** - Automatic updated_at column management
✅ **Analytics views** - Pre-calculated statistics for dashboards
✅ **Helper functions** - Simplified role checking and permissions

## 🔒 Row Level Security (RLS)

The existing RLS policies from the migrations are maintained. The new functions work with RLS:

- Users can only see their own data
- Admins can see all data
- Public endpoints are properly protected

## 🎨 Dashboard Integration

The analytics views are ready to be used in your dashboard:

```typescript
// Example: Get lead funnel
const { data } = await supabase
  .from('lead_funnel')
  .select('*');

// Example: Get daily stats
const { data } = await supabase
  .from('daily_lead_stats')
  .select('*')
  .limit(30);
```

## 📝 Notes

- All scripts are idempotent (safe to run multiple times)
- Indexes will improve read performance, slight impact on writes
- Views are automatically updated when underlying data changes
- Functions are marked as STABLE for query optimization
