'use client';

import { Badge, Button, Card, Code, Group, Kbd, Stack, Text, TextInput, Title } from 'mal-ui/core';
import {
  useClipboard,
  useColorScheme,
  useCounter,
  useDebouncedValue,
  useDisclosure,
  useDocumentTitle,
  useElementSize,
  useHotkeys,
  useIdle,
  useInterval,
  useLocalStorage,
  useMediaQuery,
  useMounted,
  useNetwork,
  useOs,
  usePrevious,
  useToggle,
  useViewportSize,
  useWindowEvent,
  useWindowScroll,
} from 'mal-ui/hooks';
import { useState } from 'react';

export default function HooksPage() {
  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  const [toggled, setToggled] = useToggle(['on', 'off'] as const);
  const clipboard = useClipboard({ timeout: 1000 });
  const { ref, width, height } = useElementSize();
  const [scroll, scrollTo] = useWindowScroll();
  const { height: vh, width: vw } = useViewportSize();
  const idle = useIdle(2000);
  const os = useOs();
  const network = useNetwork();
  const mounted = useMounted();
  const isWide = useMediaQuery('(min-width: 768px)');
  const colorScheme = useColorScheme();
  const previous = usePrevious(value);
  const [stored, setStored] = useLocalStorage({ key: 'mal-demo', defaultValue: 'hello' });
  const interval = useInterval(() => handlers.increment(), 1000);

  useDocumentTitle('Hooks — MAL UI Demo');
  useHotkeys([['mod+B', toggle]]);
  useWindowEvent('click', () => {});

  return (
    <Stack gap="lg">
      <Title order={2}>Hooks</Title>

      <Card withBorder padding="md">
        <Stack>
          <Group>
            <Button onClick={toggle}>useDisclosure ({String(opened)})</Button>
            <Kbd>⌘B</Kbd>
            <Text size="sm">also toggles via useHotkeys</Text>
          </Group>
          <Group>
            <Button onClick={handlers.increment}>+</Button>
            <Button onClick={handlers.decrement}>-</Button>
            <Button onClick={interval.start}>start interval</Button>
            <Button onClick={interval.stop}>stop</Button>
            <Badge>useCounter: {count}</Badge>
          </Group>
          <Group>
            <Button onClick={() => setToggled()}>useToggle: {toggled}</Button>
            <Button onClick={() => clipboard.copy('copied!')}>
              {clipboard.copied ? 'Copied ✓' : 'useClipboard'}
            </Button>
          </Group>
          <TextInput
            label="useDebouncedValue (400ms)"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <Group>
            <Text size="sm">debounced: <Code>{debounced || '∅'}</Code></Text>
            <Text size="sm">previous: <Code>{previous || '∅'}</Code></Text>
          </Group>
          <TextInput
            label="useLocalStorage"
            value={stored}
            onChange={(e) => setStored(e.currentTarget.value)}
          />
          <div ref={ref} style={{ resize: 'both', overflow: 'auto', border: '1px dashed', padding: 8 }}>
            useElementSize → {width} × {height}
          </div>
          <Text size="sm">useViewportSize → {vw} × {vh}</Text>
          <Text size="sm">useWindowScroll → y={Math.round(scroll.y)} <Button size="xs" onClick={() => scrollTo({ y: 0 })}>top</Button></Text>
          <Group>
            <Badge>useOs: {os}</Badge>
            <Badge color={idle ? 'gray' : 'green'}>useIdle: {String(idle)}</Badge>
            <Badge color={network.online ? 'green' : 'red'}>useNetwork: {network.online ? 'online' : 'offline'}</Badge>
            <Badge>useMediaQuery md+: {String(isWide)}</Badge>
            <Badge>useColorScheme: {colorScheme}</Badge>
            <Badge>useMounted: {String(mounted)}</Badge>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
