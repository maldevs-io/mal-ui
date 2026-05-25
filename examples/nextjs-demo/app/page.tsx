'use client';

import { Anchor, Card, List, Stack, Text, Title } from 'mal-ui/core';
import Link from 'next/link';

const ITEMS = [
  ['/core', 'Core', '100+ components — Button, Card, Inputs, AppShell, Tabs, etc.'],
  ['/hooks', 'Hooks', '80+ hooks — useDisclosure, useDebouncedValue, useClipboard…'],
  ['/form', 'Form', 'Form state management with validation'],
  ['/charts', 'Charts', 'LineChart, BarChart, AreaChart, DonutChart, RadarChart, etc.'],
  ['/notifications', 'Notifications', 'Toast notifications system'],
  ['/modals', 'Modals', 'Imperative modal manager (open, confirm, contextual)'],
  ['/spotlight', 'Spotlight', '⌘K command palette (try it now!)'],
  ['/code-highlight', 'Code highlight', 'Syntax highlighting via highlight.js'],
  ['/tiptap', 'Tiptap editor', 'Rich text editor'],
  ['/dropzone', 'Dropzone', 'File drag & drop'],
  ['/carousel', 'Carousel', 'Embla-based carousel'],
  ['/nprogress', 'Nprogress', 'Top navigation progress bar'],
  ['/dates', 'Dates', 'DatePicker, DateInput, TimePicker, Calendar, etc.'],
  ['/schedule', 'Schedule', 'Calendar / events schedule grid'],
  ['/theme', 'Theme tokens', 'MAL brand color, radius and spacing tokens'],
] as const;

export default function Home() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2}>mal-ui — Next.js 15 demo</Title>
        <Text c="dimmed" mt="xs">
          Every subpath of the library is exercised below. Use the sidebar or press ⌘K.
        </Text>
      </div>
      <Card withBorder padding="md">
        <List spacing="sm">
          {ITEMS.map(([href, label, desc]) => (
            <List.Item key={href}>
              <Anchor component={Link} href={href} fw={600}>
                {label}
              </Anchor>{' '}
              <Text component="span" c="dimmed" size="sm">
                — {desc}
              </Text>
            </List.Item>
          ))}
        </List>
      </Card>
    </Stack>
  );
}
