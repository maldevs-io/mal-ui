'use client';

import {
  Accordion,
  ActionIcon,
  Anchor,
  Alert,
  AspectRatio,
  Avatar,
  Badge,
  Blockquote,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Center,
  Checkbox,
  Chip,
  Code,
  Collapse,
  ColorInput,
  ColorPicker,
  CopyButton,
  Dialog,
  Divider,
  Drawer,
  Fieldset,
  FileInput,
  Flex,
  Grid,
  Group,
  Highlight,
  HoverCard,
  Image,
  Indicator,
  JsonInput,
  Kbd,
  List,
  Loader,
  LoadingOverlay,
  Mark,
  Menu,
  Modal,
  MultiSelect,
  NativeSelect,
  NumberFormatter,
  NumberInput,
  Overlay,
  Pagination,
  Paper,
  PasswordInput,
  Pill,
  PinInput,
  Popover,
  Progress,
  Radio,
  Rating,
  RingProgress,
  ScrollArea,
  SegmentedControl,
  Select,
  SimpleGrid,
  Skeleton,
  Slider,
  Space,
  Spoiler,
  Stack,
  Stepper,
  Switch,
  Table,
  Tabs,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  Timeline,
  Title,
  Tooltip,
  Tree,
} from 'mal-ui/core';
import { useDisclosure } from 'mal-ui/hooks';
import { useState } from 'react';

export default function CorePage() {
  const [step, setStep] = useState(1);
  const [segment, setSegment] = useState('react');
  const [collapseOpened, { toggle: toggleCollapse }] = useDisclosure(false);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [dialogOpened, { toggle: toggleDialog, close: closeDialog }] = useDisclosure(false);
  const [loadingVisible, { toggle: toggleLoading }] = useDisclosure(false);

  const treeData = [
    { label: 'src', value: 'src', children: [
      { label: 'components', value: 'components', children: [
        { label: 'Button.tsx', value: 'button' },
        { label: 'Card.tsx', value: 'card' },
      ]},
      { label: 'index.ts', value: 'index' },
    ]},
  ];

  return (
    <Stack gap="xl">
      <Title order={2}>Core components</Title>
      <Breadcrumbs>
        <Anchor>Home</Anchor>
        <Anchor>Core</Anchor>
        <Text>All</Text>
      </Breadcrumbs>

      {/* ─── Buttons & actions ───────────────────────────────── */}
      <Section title="Buttons & actions">
        <Group>
          <Button>Primary</Button>
          <Button variant="light">Light</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="gradient">Gradient</Button>
          <Button color="red">Danger</Button>
          <ActionIcon variant="filled" size="lg">★</ActionIcon>
          <CopyButton value="Hello world!">
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy} size="xs">
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            )}
          </CopyButton>
          <Tooltip label="Tooltip">
            <Badge>Hover me</Badge>
          </Tooltip>
        </Group>
        <Group>
          <Menu shadow="md" width={200}>
            <Menu.Target><Button>Menu</Button></Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item>Messages</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <HoverCard shadow="md">
            <HoverCard.Target><Button variant="outline">Hover card</Button></HoverCard.Target>
            <HoverCard.Dropdown><Text size="sm">Hover card content</Text></HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Section>

      {/* ─── Inputs ──────────────────────────────────────────── */}
      <Section title="Inputs">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput label="Name" placeholder="John" />
          <PasswordInput label="Password" />
          <Textarea label="Bio" minRows={2} />
          <Select label="Select" data={['React', 'Vue', 'Svelte']} />
          <MultiSelect label="MultiSelect" data={['React', 'Vue', 'Svelte', 'Angular']} />
          <NativeSelect label="NativeSelect" data={['Option 1', 'Option 2', 'Option 3']} />
          <TagsInput label="Tags" placeholder="Enter tag" />
          <NumberInput label="NumberInput" placeholder="Age" />
          <JsonInput label="JsonInput" placeholder='{ "key": "value" }' minRows={2} />
          <ColorInput label="ColorInput" placeholder="Pick color" />
          <FileInput label="FileInput" placeholder="Upload file" />
          <PinInput length={5} />
        </SimpleGrid>
        <Group>
          <Checkbox label="Agree" />
          <Switch label="Notifications" />
          <Radio label="One" name="r" />
          <Chip>Chip</Chip>
        </Group>
        <Rating defaultValue={3} />
        <Slider defaultValue={40} />
        <ColorPicker format="hex" />
        <Fieldset legend="Contact">
          <TextInput label="Email" placeholder="you@example.com" />
          <TextInput label="Phone" placeholder="+1 234 567 890" mt="sm" />
        </Fieldset>
      </Section>

      {/* ─── Display ─────────────────────────────────────────── */}
      <Section title="Display">
        <Group align="flex-start" wrap="wrap">
          <Card withBorder padding="md" w={220}>
            <AspectRatio ratio={16 / 9}>
              <Image radius="md" src="https://placehold.co/300x170" alt="placeholder" />
            </AspectRatio>
            <Text fw={600} mt="sm">Card title</Text>
            <Text size="sm" c="dimmed">Description text.</Text>
          </Card>
          <Stack>
            <Group>
              <Avatar>MA</Avatar>
              <Avatar color="cyan" radius="xl">AB</Avatar>
              <Indicator><ThemeIcon>★</ThemeIcon></Indicator>
              <Badge>Badge</Badge>
              <Badge variant="outline">Outline</Badge>
              <Pill>Pill</Pill>
              <Kbd>⌘K</Kbd>
            </Group>
            <Progress value={60} />
            <Progress.Root size="xl">
              <Progress.Section value={35} color="cyan"><Progress.Label>Docs</Progress.Label></Progress.Section>
              <Progress.Section value={28} color="pink"><Progress.Label>Code</Progress.Label></Progress.Section>
            </Progress.Root>
            <RingProgress sections={[{ value: 40, color: 'blue' }, { value: 25, color: 'orange' }]} />
            <Skeleton height={20} width={200} />
            <Loader size="sm" />
            <Pagination total={10} />
            <NumberFormatter value={1234567.89} prefix="$" thousandSeparator />
            <Highlight highlight={['important', 'text']}>This is important highlighted text for demo</Highlight>
            <Mark>Marked text</Mark>
            <Code>const x = 42;</Code>
            <Code block>{`function hello() {\n  return 'world';\n}`}</Code>
            <Blockquote cite="– Someone wise">Life is short, use Mantine.</Blockquote>
          </Stack>
        </Group>
      </Section>

      {/* ─── Layout ──────────────────────────────────────────── */}
      <Section title="Layout">
        <Grid>
          <Grid.Col span={4}><Paper withBorder p="xs"><Center>4 cols</Center></Paper></Grid.Col>
          <Grid.Col span={4}><Paper withBorder p="xs"><Center>4 cols</Center></Paper></Grid.Col>
          <Grid.Col span={4}><Paper withBorder p="xs"><Center>4 cols</Center></Paper></Grid.Col>
        </Grid>
        <Flex gap="sm" wrap="wrap">
          <Paper withBorder p="xs">Flex 1</Paper>
          <Paper withBorder p="xs">Flex 2</Paper>
          <Paper withBorder p="xs">Flex 3</Paper>
        </Flex>
        <ScrollArea h={100} type="always">
          <Box p="md" style={{ width: 800 }}>
            <Text>Scrollable area — drag horizontally to see. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</Text>
          </Box>
        </ScrollArea>
        <Space h="md" />
        <List>
          <List.Item>List item one</List.Item>
          <List.Item>List item two</List.Item>
          <List.Item>List item three</List.Item>
        </List>
      </Section>

      {/* ─── Navigation ──────────────────────────────────────── */}
      <Section title="Navigation & tabs">
        <Paper withBorder p="md">
          <Tabs defaultValue="one">
            <Tabs.List>
              <Tabs.Tab value="one">One</Tabs.Tab>
              <Tabs.Tab value="two">Two</Tabs.Tab>
              <Tabs.Tab value="three">Three</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="one" pt="sm">Content one</Tabs.Panel>
            <Tabs.Panel value="two" pt="sm">Content two</Tabs.Panel>
            <Tabs.Panel value="three" pt="sm">Content three</Tabs.Panel>
          </Tabs>
        </Paper>
        <SegmentedControl value={segment} onChange={setSegment} data={['react', 'vue', 'svelte']} />
        <Stepper active={step} onStepClick={setStep}>
          <Stepper.Step label="First" description="Create" />
          <Stepper.Step label="Second" description="Verify" />
          <Stepper.Step label="Done" description="Deploy" />
        </Stepper>
        <Timeline active={1}>
          <Timeline.Item title="Created"><Text size="sm">2 days ago</Text></Timeline.Item>
          <Timeline.Item title="Updated"><Text size="sm">1 day ago</Text></Timeline.Item>
          <Timeline.Item title="Deployed"><Text size="sm">just now</Text></Timeline.Item>
        </Timeline>
      </Section>

      {/* ─── Accordion ───────────────────────────────────────── */}
      <Section title="Accordion">
        <Accordion>
          <Accordion.Item value="what">
            <Accordion.Control>What is mal-ui?</Accordion.Control>
            <Accordion.Panel>A bundled re-export of all Mantine packages.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="how">
            <Accordion.Control>How to install?</Accordion.Control>
            <Accordion.Panel>Run: bun add mal-ui</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="tree">
            <Accordion.Control>Tree shaking?</Accordion.Control>
            <Accordion.Panel>Yes, use subpath imports like mal-ui/core.</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Section>

      {/* ─── Collapse & Spoiler ──────────────────────────────── */}
      <Section title="Collapse & Spoiler">
        <Button onClick={toggleCollapse}>{collapseOpened ? 'Hide' : 'Show'} content</Button>
        <Collapse expanded={collapseOpened}>
          <Paper withBorder p="md" mt="sm">
            <Text>This content is collapsible! Lorem ipsum dolor sit amet.</Text>
          </Paper>
        </Collapse>
        <Spoiler maxHeight={40} showLabel="Show more" hideLabel="Hide">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Spoiler>
      </Section>

      {/* ─── Table ───────────────────────────────────────────── */}
      <Section title="Table">
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr><Table.Td>Alice</Table.Td><Table.Td>Dev</Table.Td><Table.Td><Badge color="green">Active</Badge></Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Bob</Table.Td><Table.Td>Design</Table.Td><Table.Td><Badge color="yellow">Away</Badge></Table.Td></Table.Tr>
            <Table.Tr><Table.Td>Carol</Table.Td><Table.Td>PM</Table.Td><Table.Td><Badge color="red">Offline</Badge></Table.Td></Table.Tr>
          </Table.Tbody>
        </Table>
      </Section>

      {/* ─── Tree ────────────────────────────────────────────── */}
      <Section title="Tree">
        <Tree data={treeData} />
      </Section>

      {/* ─── Overlays & modals ───────────────────────────────── */}
      <Section title="Overlays & modals">
        <Group>
          <Button onClick={openModal}>Open Modal</Button>
          <Button variant="outline" onClick={openDrawer}>Open Drawer</Button>
          <Button variant="light" onClick={toggleDialog}>Toggle Dialog</Button>
          <Button variant="subtle" onClick={toggleLoading}>Toggle LoadingOverlay</Button>
        </Group>
        <Box pos="relative" h={80}>
          <LoadingOverlay visible={loadingVisible} />
          <Text>Content behind the loading overlay</Text>
        </Box>
        <Modal opened={modalOpened} onClose={closeModal} title="Modal demo">
          <Text>This is a modal dialog.</Text>
          <Button mt="md" onClick={closeModal}>Close</Button>
        </Modal>
        <Drawer opened={drawerOpened} onClose={closeDrawer} title="Drawer demo" position="right">
          <Text>Drawer content here.</Text>
        </Drawer>
        <Dialog opened={dialogOpened} withCloseButton onClose={closeDialog} size="lg" radius="md">
          <Text size="sm" fw={500}>Subscribe to newsletter</Text>
          <Group mt="sm">
            <TextInput placeholder="hello@example.com" style={{ flex: 1 }} />
            <Button onClick={closeDialog}>Subscribe</Button>
          </Group>
        </Dialog>
      </Section>

      {/* ─── Feedback ────────────────────────────────────────── */}
      <Section title="Feedback">
        <Stack>
          <Alert title="Info" color="blue">Informational alert message.</Alert>
          <Alert title="Success" color="green">Operation completed successfully!</Alert>
          <Alert title="Warning" color="yellow">Please review before proceeding.</Alert>
          <Alert title="Error" color="red">Something went wrong.</Alert>
          <Popover>
            <Popover.Target><Button>Open popover</Button></Popover.Target>
            <Popover.Dropdown><Text size="sm">Popover content</Text></Popover.Dropdown>
          </Popover>
          <Divider label="end of feedback" />
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
