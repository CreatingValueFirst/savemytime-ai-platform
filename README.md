# Welcome to SaveMyTime Official Website - Automation Agency

Bulgarian AI Voice Agents platform for automation and client management.

## 🚀 Live Production
**URL**: https://glasov-agent-bg-main.vercel.app

## 🛠 Tech Stack

- **Frontend**: Vite + React + TypeScript
- **UI**: shadcn-ui + Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Hosting**: Vercel

## 📋 Quick Start

### Prerequisites
- Node.js 16+ installed
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Environment variables are already set in `.env`
   - For local overrides, create `.env.local`

3. **Start dev server**
   ```bash
   npm run dev
   ```
   Open http://localhost:8080

### Build for Production

```bash
npm run build
npm run preview
```

## 🗄 Database

### Supabase Tables
- `profiles` - User profiles
- `user_roles` - Admin/client roles
- `leads` - Lead management
- `consultations` - Booking system
- `voice_selections` - Voice preferences
- `agents` - AI agent configs
- `conversations` - Chat history

### Make Yourself Admin
After signing up, run this in Supabase SQL Editor:
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT DO NOTHING;
```

See `SETUP_ADMIN.sql` for details.

## 📦 Deployment

Project is deployed on Vercel with automatic deployments from main branch.

```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

## 📚 Documentation

- **Full Setup Guide**: See `DEPLOYMENT_GUIDE.md`
- **Admin Setup**: See `SETUP_ADMIN.sql`

## 🔗 Links

- [Live Site](https://glasov-agent-bg-main.vercel.app)
- [Vercel Dashboard](https://vercel.com/infoheaveninteractive-2456s-projects/glasov-agent-bg-main)
- [Supabase Dashboard](https://supabase.com/dashboard/project/tlbodqvutqxfezgmwqmc)
