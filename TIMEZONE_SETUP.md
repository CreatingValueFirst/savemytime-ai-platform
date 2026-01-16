# Timezone Configuration - Sofia/Bulgaria

All dates and times displayed in the SaveMyTime AI Platform are automatically converted to **Sofia, Bulgaria timezone (Europe/Sofia)**.

## Overview

The application uses `date-fns` and `date-fns-tz` libraries to handle timezone conversions. All dates from the database (which are stored in UTC) are automatically converted to Sofia time before being displayed to users.

## Date Utilities

All date formatting utilities are located in `src/lib/dateUtils.ts`.

### Available Functions

#### 1. `toSofiaTime(date)`
Converts any date to Sofia/Bulgaria timezone.

```typescript
import { toSofiaTime } from '@/lib/dateUtils';

const utcDate = new Date('2026-01-17T12:00:00Z');
const sofiaDate = toSofiaTime(utcDate); // Converts to Sofia time (UTC+2 or UTC+3 depending on DST)
```

#### 2. `formatSofiaDate(date, formatString, language)`
Format date in Sofia timezone with custom format.

```typescript
import { formatSofiaDate } from '@/lib/dateUtils';

// Format: dd/MM/yyyy HH:mm:ss
const formatted = formatSofiaDate('2026-01-17T12:00:00Z', 'dd/MM/yyyy HH:mm:ss', 'bg');
// Result: "17/01/2026 14:00:00" (assuming UTC+2)
```

#### 3. `formatDateTime(date, language)`
Short date and time format for general use.

```typescript
import { formatDateTime } from '@/lib/dateUtils';

const formatted = formatDateTime('2026-01-17T12:00:00Z', 'bg');
// Result: "17/01/2026 14:00"
```

#### 4. `formatDateOnly(date, language)`
Date only (no time).

```typescript
import { formatDateOnly } from '@/lib/dateUtils';

const formatted = formatDateOnly('2026-01-17T12:00:00Z', 'bg');
// Result: "17/01/2026"
```

#### 5. `formatTimeOnly(date, language)`
Time only (no date).

```typescript
import { formatTimeOnly } from '@/lib/dateUtils';

const formatted = formatTimeOnly('2026-01-17T12:00:00Z', 'bg');
// Result: "14:00:00"
```

#### 6. `formatLongDate(date, language)`
Date with long month name.

```typescript
import { formatLongDate } from '@/lib/dateUtils';

const formatted = formatLongDate('2026-01-17T12:00:00Z', 'bg');
// Result: "17 януари 2026"

const formattedEN = formatLongDate('2026-01-17T12:00:00Z', 'en');
// Result: "January 17, 2026"
```

#### 7. `formatLongDateTime(date, language)`
Date with long month name and time.

```typescript
import { formatLongDateTime } from '@/lib/dateUtils';

const formatted = formatLongDateTime('2026-01-17T12:00:00Z', 'bg');
// Result: "17 януари 2026 в 14:00"

const formattedEN = formatLongDateTime('2026-01-17T12:00:00Z', 'en');
// Result: "January 17, 2026 at 14:00"
```

#### 8. `formatRelativeTime(date, language)`
Relative time (e.g., "2 hours ago").

```typescript
import { formatRelativeTime } from '@/lib/dateUtils';

const formatted = formatRelativeTime('2026-01-17T12:00:00Z', 'bg');
// Result: "преди 2 часа" (if current time is 2 hours later)

const formattedEN = formatRelativeTime('2026-01-17T12:00:00Z', 'en');
// Result: "2 hours ago"
```

#### 9. `formatTableDate(date, language)` ⭐ **Recommended for Data Tables**
Consistent format for all data tables.

```typescript
import { formatTableDate } from '@/lib/dateUtils';

const formatted = formatTableDate('2026-01-17T12:00:00Z', 'bg');
// Result: "17.01.2026 14:00"
```

#### 10. `formatTableDateWithSeconds(date, language)`
Data table format with seconds.

```typescript
import { formatTableDateWithSeconds } from '@/lib/dateUtils';

const formatted = formatTableDateWithSeconds('2026-01-17T12:00:00Z', 'bg');
// Result: "17.01.2026 14:00:45"
```

#### 11. `getCurrentSofiaTime()`
Get current time in Sofia timezone.

```typescript
import { getCurrentSofiaTime } from '@/lib/dateUtils';

const now = getCurrentSofiaTime();
// Returns current Date object in Sofia timezone
```

#### 12. `formatISOSofia(date)`
Format ISO string for API requests in Sofia timezone.

```typescript
import { formatISOSofia } from '@/lib/dateUtils';

const iso = formatISOSofia('2026-01-17T12:00:00Z');
// Result: ISO string in Sofia timezone
```

## Usage Examples

### In React Components

```typescript
import { formatTableDate, formatRelativeTime } from '@/lib/dateUtils';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { i18n } = useTranslation();

  // Get current language for date formatting
  const currentLanguage = i18n.language;

  // Example data from database
  const createdAt = '2026-01-17T10:30:00Z';
  const updatedAt = '2026-01-17T14:45:00Z';

  return (
    <div>
      {/* Display formatted date */}
      <p>Created: {formatTableDate(createdAt, currentLanguage)}</p>

      {/* Display relative time */}
      <p>Last updated: {formatRelativeTime(updatedAt, currentLanguage)}</p>
    </div>
  );
}
```

### In Data Tables

```typescript
import { formatTableDate } from '@/lib/dateUtils';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CallHistoryTable({ calls }) {
  const { i18n } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Phone Number</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Date & Time (Sofia)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls.map((call) => (
          <TableRow key={call.id}>
            <TableCell>{call.phone_number}</TableCell>
            <TableCell>{call.duration}s</TableCell>
            <TableCell>
              {/* Always shows Sofia/Bulgaria time */}
              {formatTableDate(call.created_at, i18n.language)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Dashboard Statistics

```typescript
import { formatRelativeTime } from '@/lib/dateUtils';
import { useTranslation } from 'react-i18next';

function AgentCard({ agent }) {
  const { i18n } = useTranslation();

  return (
    <div className="agent-card">
      <h3>{agent.name}</h3>
      <p className="text-muted-foreground">
        Created: {formatRelativeTime(agent.created_at, i18n.language)}
      </p>
      <p className="text-muted-foreground">
        Last active: {formatRelativeTime(agent.last_active_at, i18n.language)}
      </p>
    </div>
  );
}
```

## Best Practices

1. **Always use date utilities** - Never format dates manually. Always use the provided utilities to ensure consistent Sofia timezone.

2. **Pass current language** - Always pass `i18n.language` to date formatting functions for proper localization.

3. **Use `formatTableDate` for tables** - This ensures consistent formatting across all data tables.

4. **Use `formatRelativeTime` for recent activity** - For timestamps within the last few days, relative time is more user-friendly.

5. **Database timestamps** - Database stores all timestamps in UTC. The utilities automatically convert to Sofia time.

## Supported Languages

The date utilities support all platform languages with proper localization:

- 🇧🇬 **Bulgarian (bg)** - День/месец/година формат
- 🇬🇧 **English (en)** - Month/day/year format
- 🇷🇺 **Russian (ru)** - День/месяц/год формат
- 🇪🇸 **Spanish (es)** - Día/mes/año formato

## Daylight Saving Time (DST)

Sofia/Bulgaria observes daylight saving time:
- **Winter (Standard Time)**: UTC+2
- **Summer (Daylight Time)**: UTC+3

The `date-fns-tz` library automatically handles DST transitions, so you don't need to worry about manual adjustments.

## Testing

To test timezone conversions:

```typescript
import { formatTableDate, toSofiaTime } from '@/lib/dateUtils';

// Test UTC to Sofia conversion
console.log('UTC Time:', '2026-01-17T12:00:00Z');
console.log('Sofia Time:', toSofiaTime('2026-01-17T12:00:00Z'));
console.log('Formatted:', formatTableDate('2026-01-17T12:00:00Z', 'bg'));
```

## Common Patterns

### Display created_at and updated_at

```typescript
<div>
  <p>Created: {formatLongDateTime(item.created_at, i18n.language)}</p>
  <p>Updated: {formatRelativeTime(item.updated_at, i18n.language)}</p>
</div>
```

### Display in a table

```typescript
<TableCell>
  {formatTableDate(item.created_at, i18n.language)}
</TableCell>
```

### Display preferred appointment time

```typescript
<p>
  Your consultation is scheduled for: {formatLongDateTime(consultation.preferred_date, i18n.language)}
</p>
```

## Summary

✅ All dates automatically converted to Sofia/Bulgaria timezone
✅ Multilingual support (BG, EN, RU, ES)
✅ Automatic DST handling
✅ Consistent formatting across all tables and components
✅ Easy to use with i18n integration

**Always use the provided date utilities** to ensure consistent, correct timezone handling throughout the application!
