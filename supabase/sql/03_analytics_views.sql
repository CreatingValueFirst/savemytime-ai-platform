-- ==================================================
-- ANALYTICS VIEWS & FUNCTIONS - Save My Time
-- ==================================================
-- Useful views for reporting and analytics dashboards
-- ==================================================

-- ==================== DASHBOARD VIEWS ====================

-- View: Lead conversion funnel
CREATE OR REPLACE VIEW public.lead_funnel AS
SELECT
  l.source,
  COUNT(*) as total_leads,
  COUNT(c.id) as leads_with_consultations,
  ROUND(COUNT(c.id)::numeric / NULLIF(COUNT(*), 0) * 100, 2) as conversion_rate
FROM public.leads l
LEFT JOIN public.consultations c ON l.id = c.lead_id
GROUP BY l.source
ORDER BY total_leads DESC;

-- View: Daily lead statistics
CREATE OR REPLACE VIEW public.daily_lead_stats AS
SELECT
  DATE(created_at) as date,
  source,
  status,
  COUNT(*) as count
FROM public.leads
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), source, status
ORDER BY date DESC, count DESC;

-- View: Consultation statistics
CREATE OR REPLACE VIEW public.consultation_stats AS
SELECT
  DATE(created_at) as date,
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE preferred_date IS NOT NULL) as with_preferred_date
FROM public.consultations
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), status
ORDER BY date DESC;

-- View: Agent performance
CREATE OR REPLACE VIEW public.agent_performance AS
SELECT
  a.id,
  a.name,
  a.status,
  COUNT(c.id) as total_conversations,
  COUNT(c.id) FILTER (WHERE c.status = 'completed') as completed_conversations,
  ROUND(
    COUNT(c.id) FILTER (WHERE c.status = 'completed')::numeric /
    NULLIF(COUNT(c.id), 0) * 100,
    2
  ) as completion_rate,
  MAX(c.started_at) as last_conversation
FROM public.agents a
LEFT JOIN public.conversations c ON a.id = c.agent_id
GROUP BY a.id, a.name, a.status
ORDER BY total_conversations DESC;

-- View: User activity summary
CREATE OR REPLACE VIEW public.user_activity AS
SELECT
  u.id,
  u.email,
  p.full_name,
  ur.role,
  p.company_name,
  u.created_at as signed_up_at,
  (SELECT COUNT(*) FROM public.leads WHERE user_id = u.id) as leads_created,
  (SELECT COUNT(*) FROM public.consultations WHERE user_id = u.id) as consultations_created,
  (SELECT COUNT(*) FROM public.agents WHERE user_id = u.id) as agents_created,
  u.last_sign_in_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
ORDER BY u.created_at DESC;

-- ==================== ANALYTICS FUNCTIONS ====================

-- Function: Get leads by date range
CREATE OR REPLACE FUNCTION public.get_leads_by_date_range(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  date DATE,
  total_leads BIGINT,
  new_status BIGINT,
  contacted_status BIGINT,
  qualified_status BIGINT,
  converted_status BIGINT
)
LANGUAGE SQL
STABLE
AS $$
  SELECT
    DATE(created_at) as date,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_status,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_status,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_status,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_status
  FROM public.leads
  WHERE DATE(created_at) BETWEEN start_date AND end_date
  GROUP BY DATE(created_at)
  ORDER BY date DESC;
$$;

-- Function: Get top sources
CREATE OR REPLACE FUNCTION public.get_top_lead_sources(limit_count INT DEFAULT 10)
RETURNS TABLE (
  source TEXT,
  lead_count BIGINT,
  percentage NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
  WITH source_counts AS (
    SELECT
      source,
      COUNT(*) as count
    FROM public.leads
    GROUP BY source
  ),
  total AS (
    SELECT SUM(count) as total_count FROM source_counts
  )
  SELECT
    sc.source,
    sc.count as lead_count,
    ROUND((sc.count::numeric / t.total_count * 100), 2) as percentage
  FROM source_counts sc
  CROSS JOIN total t
  ORDER BY sc.count DESC
  LIMIT limit_count;
$$;

-- Function: Get monthly growth
CREATE OR REPLACE FUNCTION public.get_monthly_growth()
RETURNS TABLE (
  month DATE,
  new_users BIGINT,
  new_leads BIGINT,
  new_consultations BIGINT,
  user_growth_rate NUMERIC,
  lead_growth_rate NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
  WITH monthly_stats AS (
    SELECT
      DATE_TRUNC('month', created_at)::DATE as month,
      COUNT(*) as users
    FROM auth.users
    GROUP BY DATE_TRUNC('month', created_at)
  ),
  monthly_leads AS (
    SELECT
      DATE_TRUNC('month', created_at)::DATE as month,
      COUNT(*) as leads
    FROM public.leads
    GROUP BY DATE_TRUNC('month', created_at)
  ),
  monthly_consultations AS (
    SELECT
      DATE_TRUNC('month', created_at)::DATE as month,
      COUNT(*) as consultations
    FROM public.consultations
    GROUP BY DATE_TRUNC('month', created_at)
  )
  SELECT
    COALESCE(ms.month, ml.month, mc.month) as month,
    COALESCE(ms.users, 0) as new_users,
    COALESCE(ml.leads, 0) as new_leads,
    COALESCE(mc.consultations, 0) as new_consultations,
    ROUND(
      (COALESCE(ms.users, 0)::numeric - LAG(COALESCE(ms.users, 0)) OVER (ORDER BY ms.month)) /
      NULLIF(LAG(COALESCE(ms.users, 0)) OVER (ORDER BY ms.month), 0) * 100,
      2
    ) as user_growth_rate,
    ROUND(
      (COALESCE(ml.leads, 0)::numeric - LAG(COALESCE(ml.leads, 0)) OVER (ORDER BY ml.month)) /
      NULLIF(LAG(COALESCE(ml.leads, 0)) OVER (ORDER BY ml.month), 0) * 100,
      2
    ) as lead_growth_rate
  FROM monthly_stats ms
  FULL OUTER JOIN monthly_leads ml ON ms.month = ml.month
  FULL OUTER JOIN monthly_consultations mc ON COALESCE(ms.month, ml.month) = mc.month
  ORDER BY month DESC
  LIMIT 12;
$$;

-- ==================== GRANT PERMISSIONS ====================

-- Grant access to views for authenticated users
GRANT SELECT ON public.lead_funnel TO authenticated;
GRANT SELECT ON public.daily_lead_stats TO authenticated;
GRANT SELECT ON public.consultation_stats TO authenticated;
GRANT SELECT ON public.agent_performance TO authenticated;
GRANT SELECT ON public.user_activity TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.get_leads_by_date_range TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_top_lead_sources TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_monthly_growth TO authenticated;

-- ==================== COMMENTS ====================

COMMENT ON VIEW public.lead_funnel IS 'Shows conversion rates by lead source';
COMMENT ON VIEW public.daily_lead_stats IS 'Daily lead statistics for the last 30 days';
COMMENT ON VIEW public.consultation_stats IS 'Consultation statistics for the last 30 days';
COMMENT ON VIEW public.agent_performance IS 'Performance metrics for all agents';
COMMENT ON VIEW public.user_activity IS 'Summary of user activity and engagement';

COMMENT ON FUNCTION public.get_leads_by_date_range IS 'Get detailed lead statistics for a specific date range';
COMMENT ON FUNCTION public.get_top_lead_sources IS 'Get top lead sources with counts and percentages';
COMMENT ON FUNCTION public.get_monthly_growth IS 'Get monthly growth statistics for the last 12 months';
