'use client';

import { Card, Group, SimpleGrid, Stack, Text, Title } from 'mal-ui/core';
import {
  Calendar,
  DateInput,
  DatePicker,
  DatePickerInput,
  DateTimePicker,
  DatesProvider,
  InlineDateTimePicker,
  MiniCalendar,
  MonthPicker,
  MonthPickerInput,
  TimeGrid,
  TimeInput,
  TimePicker,
  TimeValue,
  YearPicker,
  YearPickerInput,
} from 'mal-ui/dates';
import { useState } from 'react';

export default function DatesPage() {
  const [dateValue, setDateValue] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
  const [monthValue, setMonthValue] = useState<string | null>(null);
  const [yearValue, setYearValue] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState('');

  return (
    <DatesProvider settings={{ locale: 'en', firstDayOfWeek: 1 }}>
      <Stack gap="lg">
        <Title order={2}>Dates</Title>

        {/* ─── Inline pickers ────────────────────────────────── */}
        <Card withBorder padding="md">
          <Stack>
            <Title order={4}>Inline Pickers</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  Calendar
                </Text>
                <Calendar />
              </Stack>
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  DatePicker (range)
                </Text>
                <DatePicker type="range" value={dateRange} onChange={setDateRange} />
              </Stack>
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  MiniCalendar
                </Text>
                <MiniCalendar />
              </Stack>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* ─── Input components ──────────────────────────────── */}
        <Card withBorder padding="md">
          <Stack>
            <Title order={4}>Date Inputs</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <DateInput
                label="DateInput"
                placeholder="Pick a date"
                value={dateValue}
                onChange={setDateValue}
              />
              <DatePickerInput
                label="DatePickerInput"
                placeholder="Pick a date"
                value={dateValue}
                onChange={setDateValue}
              />
              <DateTimePicker label="DateTimePicker" placeholder="Pick date & time" />
              <MonthPickerInput
                label="MonthPickerInput"
                placeholder="Pick a month"
                value={monthValue}
                onChange={setMonthValue}
              />
              <YearPickerInput
                label="YearPickerInput"
                placeholder="Pick a year"
                value={yearValue}
                onChange={setYearValue}
              />
            </SimpleGrid>
          </Stack>
        </Card>

        {/* ─── Month & Year Pickers ──────────────────────────── */}
        <Card withBorder padding="md">
          <Stack>
            <Title order={4}>Month & Year Pickers</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  MonthPicker
                </Text>
                <MonthPicker value={monthValue} onChange={setMonthValue} />
              </Stack>
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  YearPicker
                </Text>
                <YearPicker value={yearValue} onChange={setYearValue} />
              </Stack>
            </SimpleGrid>
          </Stack>
        </Card>

        {/* ─── Time components ───────────────────────────────── */}
        <Card withBorder padding="md">
          <Stack>
            <Title order={4}>Time Inputs</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              <TimeInput
                label="TimeInput"
                value={timeValue}
                onChange={(e) => setTimeValue(e.currentTarget.value)}
              />
              <TimePicker label="TimePicker" />
              <Stack gap="xs">
                <Text fw={600} size="sm">
                  TimeValue display
                </Text>
                <TimeValue value="14:30:00" />
              </Stack>
            </SimpleGrid>
            <Stack gap="xs">
              <Text fw={600} size="sm">
                TimeGrid
              </Text>
              <TimeGrid
                data={[
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                  '12:00',
                  '13:00',
                  '14:00',
                  '15:00',
                  '16:00',
                ]}
              />
            </Stack>
          </Stack>
        </Card>

        {/* ─── InlineDateTimePicker ──────────────────────────── */}
        <Card withBorder padding="md">
          <Stack>
            <Title order={4}>InlineDateTimePicker</Title>
            <InlineDateTimePicker />
          </Stack>
        </Card>

        {/* ─── Selected values display ───────────────────────── */}
        <Card withBorder padding="md">
          <Stack gap="xs">
            <Title order={4}>Current values</Title>
            <Group>
              <Text size="sm">
                Date:{' '}
                <Text span fw={600}>
                  {dateValue ?? 'none'}
                </Text>
              </Text>
              <Text size="sm">
                Month:{' '}
                <Text span fw={600}>
                  {monthValue ?? 'none'}
                </Text>
              </Text>
              <Text size="sm">
                Year:{' '}
                <Text span fw={600}>
                  {yearValue ?? 'none'}
                </Text>
              </Text>
              <Text size="sm">
                Time:{' '}
                <Text span fw={600}>
                  {timeValue || 'none'}
                </Text>
              </Text>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </DatesProvider>
  );
}
