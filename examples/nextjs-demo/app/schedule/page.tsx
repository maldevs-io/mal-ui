'use client';

import { Card, Group, SegmentedControl, Stack, Title } from 'mal-ui/core';
import { Schedule, type ScheduleEventData, type ScheduleViewLevel } from 'mal-ui/schedule';
import { useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');
const today = new Date();
const ymd = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
const dt = (h: number, m = 0) => `${ymd} ${pad(h)}:${pad(m)}:00`;

const initialEvents: ScheduleEventData[] = [
  { id: '1', title: 'Standup', start: dt(9), end: dt(9, 30), color: 'blue' },
  { id: '2', title: 'Design review', start: dt(11), end: dt(12), color: 'grape' },
  { id: '3', title: 'Lunch', start: dt(13), end: dt(14), color: 'orange' },
  { id: '4', title: 'Focus block', start: dt(15), end: dt(17), color: 'teal' },
];

export default function SchedulePage() {
  const [events, setEvents] = useState<ScheduleEventData[]>(initialEvents);
  const [view, setView] = useState<ScheduleViewLevel>('day');

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Schedule</Title>
        <SegmentedControl
          value={view}
          onChange={(v) => setView(v as ScheduleViewLevel)}
          data={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
        />
      </Group>
      <Card withBorder padding="md">
        <Schedule
          events={events}
          view={view}
          onViewChange={setView}
          date={ymd}
          withEventsDragAndDrop
          onEventDrop={({ eventId, newStart, newEnd }) =>
            setEvents((prev) =>
              prev.map((e) => (e.id === eventId ? { ...e, start: newStart, end: newEnd } : e)),
            )
          }
          h={500}
        />
      </Card>
    </Stack>
  );
}
