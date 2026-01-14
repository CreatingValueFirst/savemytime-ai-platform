# Glasov Agent - Deployment Complete! 🎉

## 🌐 Live URLs

### Production
**Main URL**: https://glasov-agent-bg-main.vercel.app

### Local Development
- **Dev Server**: http://localhost:8080/
- **Preview Server**: http://localhost:4173/

---

## ✅ Completed Setup

### 1. Project Configuration
- ✅ Extracted and installed dependencies
- ✅ Environment variables configured
- ✅ Supabase credentials set up

### 2. Database Setup
- ✅ Supabase project linked: `tlbodqvutqxfezgmwqmc`
- ✅ All migrations pushed successfully
- ✅ Tables created:
  - `profiles` - User profile information
  - `user_roles` - Admin/client role management
  - `leads` - Lead tracking system
  - `consultations` - Consultation bookings
  - `voice_selections` - Voice AI preferences
  - `agents` - AI agent configurations
  - `conversations` - Chat history

### 3. Deployment
- ✅ Deployed to Vercel
- ✅ SPA routing configured (`vercel.json`)
- ✅ Environment variables set for production, preview, and development
- ✅ Build optimized and production-ready

---

## 🚀 Next Steps

### 1. Make Yourself Admin

After signing up on the live site:

1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/tlbodqvutqxfezgmwqmc/sql)
2. Open the file `SETUP_ADMIN.sql` in this directory
3. Replace `'your-email@example.com'` with your email
4. Run the query

Or use this quick command:
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'YOUR_EMAIL_HERE'
ON CONFLICT DO NOTHING;
```

### 2. Test the Application

1. Visit: https://glasov-agent-bg-main.vercel.app
2. Sign up for an account
3. Set yourself as admin (step 1 above)
4. Access admin features

### 3. Optional: Custom Domain

To add a custom domain:

1. Go to [Vercel Dashboard](https://vercel.com/infoheaveninteractive-2456s-projects/glasov-agent-bg-main/settings/domains)
2. Add your domain
3. Configure DNS records:
   - **A Record** for root: `76.76.21.21`
   - **CNAME** for www: `cname.vercel-dns.com`

---

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
npx vercel

# Deploy to production
npx vercel --prod
```

---

## 📊 Database Management

### View Tables
```bash
# Login to Supabase
SUPABASE_ACCESS_TOKEN=sbp_98cfa3d61b9191cf20b8da2749420837fbe7b835 supabase link --project-ref tlbodqvutqxfezgmwqmc

# Pull remote schema
supabase db pull
```

### Create New Migration
```bash
# Create a new migration file
supabase migration new your_migration_name

# Push to Supabase
supabase db push
```

---

## 🔧 Environment Variables

### Local (.env)
```
VITE_SUPABASE_PROJECT_ID="tlbodqvutqxfezgmwqmc"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_F3SoBtTCrFaAJsZwsaekZw_2J8jc_Fy"
VITE_SUPABASE_URL="https://tlbodqvutqxfezgmwqmc.supabase.co"
```

### Vercel (Already Configured)
All environment variables have been set for:
- Production
- Preview
- Development

---

## 📝 Project Structure

```
glasov-agent-bg-main/
├── src/                    # Source code
├── supabase/
│   └── migrations/         # Database migrations
├── dist/                   # Production build
├── .env                    # Environment variables
├── vercel.json            # Vercel SPA routing config
├── SETUP_ADMIN.sql        # Admin setup script
└── DEPLOYMENT_GUIDE.md    # This file
```

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vercel
npm install
npm run build
```

### Database Connection Issues
- Verify Supabase project is active
- Check environment variables match
- Ensure RLS policies are set correctly

### Deployment Issues
```bash
# Check deployment logs
npx vercel logs

# Inspect specific deployment
npx vercel inspect [deployment-url]
```

---

## 📚 Useful Links

- **Vercel Dashboard**: https://vercel.com/infoheaveninteractive-2456s-projects/glasov-agent-bg-main
- **Supabase Dashboard**: https://supabase.com/dashboard/project/tlbodqvutqxfezgmwqmc
- **Live Site**: https://glasov-agent-bg-main.vercel.app

---

## ⚡ Performance Notes

Current build size:
- **HTML**: 2.32 kB
- **CSS**: 70.30 kB (gzip: 12.47 kB)
- **JS**: 630.67 kB (gzip: 185.67 kB)

**Optimization Recommendations**:
- Consider code-splitting for chunks > 500 kB
- Use dynamic imports for route-based splitting
- Optimize images and assets
- Enable lazy loading for heavy components

---

**Deployment completed**: 2026-01-15
**Framework**: Vite + React + TypeScript
**Backend**: Supabase
**Hosting**: Vercel
