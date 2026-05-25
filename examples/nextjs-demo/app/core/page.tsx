'use client';

import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  ColorPicker,
  Divider,
  Group,
  Image,
  Indicator,
  Kbd,
  Loader,
  Pagination,
  Paper,
  PasswordInput,
  Pill,
  Popover,
  Progress,
  Radio,
  Rating,
  RingProgress,
  Select,
  Skeleton,
  Slider,
  Stack,
  Stepper,
  Switch,
  Tabs,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Timeline,
  Title,
  Tooltip,
} from 'mal-ui/core';
import { useState } from 'react';

export default function CorePage() {
  const [step, setStep] = useState(1);

  return (
    <Stack gap="xl">
      <Title order={2}>Core components</Title>
      <Breadcrumbs>
        <Text>Home</Text>
        <Text>Core</Text>
      </Breadcrumbs>

      <Section title="Buttons & actions">
        <Group>
          <Button>Primary</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button color="red">Danger</Button>
          <ActionIcon variant="filled">★</ActionIcon>
          <Tooltip label="Tooltip">
            <Badge>Hover me</Badge>
          </Tooltip>
        </Group>
      </Section>

      <Section title="Inputs">
        <Stack>
          <TextInput label="Name" placeholder="John" />
          <PasswordInput label="Password" />
          <Textarea label="Bio" minRows={2} />
          <Select label="Pick one" data={['React', 'Vue', 'Svelte']} />
          <Group>
            <Checkbox label="Agree" />
            <Switch label="Notifications" />
            <Radio label="One" name="r" />
            <Chip>Chip</Chip>
          </Group>
          <Rating defaultValue={3} />
          <Slider defaultValue={40} />
          <ColorPicker format="hex" />
        </Stack>
      </Section>

      <Section title="Display">
        <Group align="flex-start">
          <Card withBorder padding="md" w={220}>
            <Image radius="md" h={100} src="https://placehold.co/300x100" alt="placeholder" />
            <Text fw={600} mt="sm">Card title</Text>
            <Text size="sm" c="dimmed">Some description text.</Text>
          </Card>
          <Stack>
            <Group>
              <Avatar>MA</Avatar>
              <Indicator><ThemeIcon>★</ThemeIcon></Indicator>
              <Badge>Badge</Badge>
              <Pill>Pill</Pill>
              <Kbd>⌘K</Kbd>
            </Group>
            <Progress value={60} />
            <RingProgress sections={[{ value: 40, color: 'blue' }]} />
            <Skeleton height={20} width={200} />
            <Loader size="sm" />
            <Pagination total={10} />
          </Stack>
        </Group>
      </Section>

      <Section title="Layout & navigation">
        <Paper withBorder p="md">
          <Tabs defaultValue="one">
            <Tabs.List>
              <Tabs.Tab value="one">One</Tabs.Tab>
              <Tabs.Tab value="two">Two</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="one" pt="sm">Content one</Tabs.Panel>
            <Tabs.Panel value="two" pt="sm">Content two</Tabs.Panel>
          </Tabs>
        </Paper>
        <Stepper active={step} onStepClick={setStep}>
          <Stepper.Step label="First" />
          <Stepper.Step label="Second" />
          <Stepper.Step label="Done" />
        </Stepper>
        <Timeline active={1}>
          <Timeline.Item title="Created"><Text size="sm">2 days ago</Text></Timeline.Item>
          <Timeline.Item title="Updated"><Text size="sm">1 day ago</Text></Timeline.Item>
          <Timeline.Item title="Deployed"><Text size="sm">just now</Text></Timeline.Item>
        </Timeline>
      </Section>

      <Section title="Feedback & overlays">
        <Stack>
          <Alert title="Heads up" color="blue">Informational message.</Alert>
          <Popover>
            <Popover.Target><Button>Open popover</Button></Popover.Target>
            <Popover.Dropdown><Text size="sm">Hello</Text></Popover.Dropdown>
          </Popover>
          <Divider label="end" />
          <Box bg="gray.1" p="md">A Box</Box>
        </Stack>
      </Section>
    </Stack>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="sm">
      <Title order={4}>{title}</Title>
      {children}
    </Stack>
  );
}
