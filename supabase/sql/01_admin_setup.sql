-- ==================================================
-- ADMIN USER SETUP - Save My Time
-- ==================================================
-- This script sets up the admin user for info@savemytime.dev
-- Run this AFTER the user signs up through the app
-- ==================================================

-- Set admin role for info@savemytime.dev
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'info@savemytime.dev'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify admin setup
SELECT
  u.id,
  u.email,
  u.created_at as user_created,
  ur.role,
  ur.created_at as role_created
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'info@savemytime.dev';

-- ==================================================
-- ADMIN VERIFICATION QUERY
-- ==================================================
-- Run this to check if admin role is properly assigned:

SELECT
  COUNT(*) FILTER (WHERE role = 'admin') as admin_count,
  COUNT(*) FILTER (WHERE role = 'client') as client_count,
  COUNT(*) as total_users
FROM public.user_roles;
