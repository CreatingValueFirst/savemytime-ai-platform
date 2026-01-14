-- ==================================================
-- ADMIN SETUP SCRIPT
-- ==================================================
-- Run this in Supabase SQL Editor after signing up
-- Replace 'your-email@example.com' with your actual email
-- ==================================================

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT DO NOTHING;

-- ==================================================
-- VERIFY ADMIN ROLE
-- ==================================================
-- Run this to check if admin role was assigned:

SELECT
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'your-email@example.com';
