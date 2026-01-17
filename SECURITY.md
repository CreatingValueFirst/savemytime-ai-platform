# Security Policy

## Overview

SaveMyTime AI Platform takes security seriously. This document outlines our security practices, policies, and guidelines for reporting vulnerabilities.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Authentication & Authorization

### Supabase Authentication

The platform uses Supabase Auth for user authentication with the following security measures:

- **Password Requirements**: Minimum 6 characters (enforced at application level)
- **Session Management**: JWT-based authentication with automatic token refresh
- **Secure Storage**: Tokens stored in httpOnly cookies (handled by Supabase)

### Row Level Security (RLS)

All database tables have Row Level Security enabled to ensure data isolation:

#### Profiles Table
- Users can only view, update, and insert their own profile
- Policy: `auth.uid() = user_id`

#### Agents Table
- Users can manage (CRUD) only their own agents
- Admins can view all agents
- Policy: `auth.uid() = user_id` OR `has_role(auth.uid(), 'admin')`

#### Conversations Table
- Users can only view conversations from their own agents
- Admins can view all conversations
- Policy: Agent ownership check through JOIN

#### Leads Table
- Anyone can create leads (public contact forms)
- Only admins can view and update leads
- Policy: `has_role(auth.uid(), 'admin')` for SELECT/UPDATE

#### Consultations Table
- Anyone can create consultation requests
- Users can view their own consultations
- Admins can view all consultations

## Data Protection

### Encryption

- **In Transit**: All data transmitted over HTTPS/TLS 1.3
- **At Rest**: Database encryption managed by Supabase (AES-256)
- **Environment Variables**: Stored securely in Vercel environment variables

### GDPR Compliance

The platform is designed with GDPR compliance in mind:

- **Data Minimization**: Only collect necessary user data
- **Right to Access**: Users can view their profile and agents
- **Right to Deletion**: CASCADE DELETE on user deletion
- **Timezone Handling**: All dates stored and displayed in Sofia/Bulgaria timezone
- **Consent**: Users must create an account to use the platform

### Sensitive Data Handling

**Do NOT store in the codebase:**
- API keys (use environment variables)
- Passwords (handled by Supabase Auth)
- Private keys
- Access tokens

**Environment Variables:**
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
```

## API Security

### Supabase Client Configuration

```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Only use PUBLISHABLE key in client-side code
export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Security Notes:**
- Never use the `service_role` key in client-side code
- The `publishable_key` is safe for client exposure
- All data access is protected by RLS policies

### Rate Limiting

**Current Status**: ⚠️ Not yet implemented

**Recommendations:**
- Implement rate limiting on contact forms (10 requests/minute)
- Implement rate limiting on authentication endpoints
- Use Vercel Edge Functions for API rate limiting

## Frontend Security

### XSS Protection

- React automatically escapes values in JSX
- No use of `dangerouslySetInnerHTML` in the codebase
- All user input is sanitized before database insertion

### CSRF Protection

**Current Status**: ⚠️ Relies on Supabase's built-in CSRF protection

**Recommendations:**
- Implement CSRF tokens for critical actions
- Use SameSite cookie attribute

### Content Security Policy (CSP)

**Current Status**: ⚠️ Not yet implemented

**Recommended CSP Headers:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co;
  frame-ancestors 'none';
```

## Error Handling

### Error Boundaries

The application implements React Error Boundaries:

```typescript
// src/components/ErrorBoundary.tsx
<ErrorBoundary>
  <Routes>
    {/* All routes */}
  </Routes>
</ErrorBoundary>
```

**Features:**
- Catches unhandled errors in React components
- Displays user-friendly error message
- Logs errors to console (TODO: integrate error tracking service)

### Sensitive Information Exposure

**Prevention Measures:**
- No stack traces displayed to end users
- Error details hidden in production builds
- Database errors not exposed to client
- Generic error messages for authentication failures

## Dependency Security

### Regular Updates

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Security Scanning

**Automated Scanning:**
- GitHub Dependabot alerts enabled
- Vercel security scanning on deployment

## Deployment Security

### Vercel Configuration

**Environment Variables:**
- Production keys stored in Vercel dashboard
- Never commit `.env.local` to version control
- Use `.env.example` as template

**Headers:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

## Incident Response

### Reporting a Vulnerability

If you discover a security vulnerability, please follow responsible disclosure:

1. **DO NOT** open a public GitHub issue
2. Email security concerns to: info@savemytime.dev
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Target**: Within 30 days (based on severity)

### Severity Levels

- **Critical**: Immediate access to sensitive data
- **High**: Potential data breach or system compromise
- **Medium**: Limited access or denial of service
- **Low**: Minimal impact

## Security Checklist

### Before Production Deployment

- [x] TypeScript strict mode enabled
- [x] Error boundaries implemented
- [x] Environment variables properly configured
- [x] HTTPS enforced
- [x] RLS enabled on all tables
- [x] Authentication flow tested
- [ ] CSP headers configured
- [ ] Rate limiting implemented
- [ ] Input sanitization with DOMPurify
- [ ] Security audit completed
- [ ] Error tracking service integrated (Sentry)
- [ ] CSRF protection verified
- [ ] API endpoints security tested
- [ ] Dependency vulnerabilities resolved

### Ongoing Security Tasks

- [ ] Regular dependency updates (monthly)
- [ ] Security audit (quarterly)
- [ ] Penetration testing (annually)
- [ ] RLS policy review (quarterly)
- [ ] Access logs monitoring
- [ ] Backup verification (weekly)

## Database Security

### Backup Strategy

**Supabase Automatic Backups:**
- Daily snapshots for Pro plan
- Point-in-time recovery available
- 7-day retention for free tier

**Manual Backup:**
```bash
# Export schema
pg_dump --schema-only <database-url> > schema.sql

# Export data
pg_dump --data-only <database-url> > data.sql
```

### Access Control

**Principle of Least Privilege:**
- Service role key never exposed to client
- API keys rotated regularly
- Database users have minimal required permissions

## Compliance

### Standards & Regulations

- **GDPR**: EU General Data Protection Regulation compliance
- **ISO 27001**: Information security management (planned)
- **SOC 2**: Security and availability (planned)

### Data Retention

- **User Data**: Retained until account deletion
- **Logs**: 30 days retention
- **Analytics**: Aggregated data retained indefinitely
- **Backups**: 7-30 days based on plan

## Monitoring & Logging

### Current Implementation

- Console logging for errors
- Supabase dashboard for database metrics

### Planned Implementation

- [ ] Sentry for error tracking
- [ ] Log aggregation service
- [ ] Real-time alerting for security events
- [ ] Uptime monitoring (UptimeRobot/Pingdom)

## Contact

For security-related questions or concerns:

- **Email**: info@savemytime.dev
- **Website**: https://savemytime.dev
- **Location**: Sofia, Bulgaria

---

**Last Updated**: January 17, 2026
**Version**: 1.0.0
**Next Review**: April 17, 2026
