'use client';

import {
  Badge,
  Button,
  Card,
  Code,
  ColorSwatch,
  Group,
  Kbd,
  List,
  NumberInput,
  Paper,
  Progress,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  TextInput,
  Title,
} from 'mal-ui/core';
import {
  useClickOutside,
  useClipboard,
  useColorScheme,
  useCounter,
  useDebouncedCallback,
  useDebouncedState,
  useDebouncedValue,
  useDisclosure,
  useDocumentTitle,
  useDocumentVisibility,
  useElementSize,
  useEyeDropper,
  useFavicon,
  useFetch,
  useFocusWithin,
  useForceUpdate,
  useFullscreenElement,
  useHash,
  useHotkeys,
  useHover,
  useId,
  useIdle,
  useInViewport,
  useInputState,
  useInterval,
  useIsFirstRender,
  useListState,
  useLocalStorage,
  useLogger,
  useMap,
  useMediaQuery,
  useMounted,
  useMouse,
  useMove,
  useNetwork,
  useOrientation,
  useOs,
  usePageLeave,
  usePagination,
  usePrevious,
  useQueue,
  useReducedMotion,
  useScrollIntoView,
  useSelection,
  useSessionStorage,
  useSet,
  useSetState,
  useStateHistory,
  useTextSelection,
  useThrottledValue,
  useTimeout,
  useToggle,
  useUncontrolled,
  useViewportSize,
  useWindowEvent,
  useWindowScroll,
} from 'mal-ui/hooks';
import { useCallback, useRef, useState } from 'react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card withBorder padding="md">
      <Stack>
        <Title order={4}>{title}</Title>
        {children}
      </Stack>
    </Card>
  );
}

export default function HooksPage() {
  // ─── State & UI hooks ───────────────────────────────────────
  const [opened, { toggle }] = useDisclosure(false);
  const [count, handlers] = useCounter(0, { min: 0, max: 100 });
  const [toggled, setToggled] = useToggle(['on', 'off'] as const);
  const forceUpdate = useForceUpdate();
  const id = useId();
  const isFirstRender = useIsFirstRender();

  // ─── Input / value hooks ────────────────────────────────────
  const [inputVal, setInputVal] = useInputState('');
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 400);
  const [debouncedState, setDebouncedState] = useDebouncedState('', 400);
  const debouncedCallback = useDebouncedCallback((v: string) => v, 400);
  const [throttled] = useThrottledValue(value, 500);
  const previous = usePrevious(value);
  const [uncontrolled, setUncontrolled] = useUncontrolled({
    defaultValue: 'default',
    finalValue: 'final',
  });

  // ─── Clipboard ─────────────────────────────────────────────
  const clipboard = useClipboard({ timeout: 1000 });

  // ─── Collections ────────────────────────────────────────────
  const [list, listHandlers] = useListState(['Item A', 'Item B', 'Item C']);
  const mapHook = useMap<string, number>([
    ['apples', 3],
    ['bananas', 5],
  ]);
  const setHook = useSet<string>(['react', 'mantine']);
  const queueHook = useQueue<string>({ initialValues: ['First', 'Second'], limit: 3 });
  const [stateObj, setStateObj] = useSetState({ name: 'Anas', age: 25 });
  const [historyValue, historyHandlers, { history, current }] = useStateHistory(0);

  // ─── Storage ────────────────────────────────────────────────
  const [stored, setStored] = useLocalStorage({ key: 'mal-demo-hooks', defaultValue: 'hello' });
  const [sessionStored, setSessionStored] = useSessionStorage({
    key: 'mal-session',
    defaultValue: 'world',
  });

  // ─── DOM / Element ──────────────────────────────────────────
  const { ref: sizeRef, width, height } = useElementSize();
  const { hovered, ref: hoverRef } = useHover();
  const { ref: focusRef, focused } = useFocusWithin();
  const { ref: inViewRef, inViewport } = useInViewport();
  const { ref: mouseRef, x: mouseX, y: mouseY } = useMouse();
  const clickOutsideRef = useClickOutside(() => {});
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const textSelection = useTextSelection();

  // ─── Selection ──────────────────────────────────────────────
  const [selected, selectionHandlers] = useSelection({ data: ['A', 'B', 'C', 'D', 'E'] });

  // ─── Window / Document ──────────────────────────────────────
  const { height: vh, width: vw } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();
  const idle = useIdle(2000);
  const os = useOs();
  const network = useNetwork();
  const mounted = useMounted();
  const isWide = useMediaQuery('(min-width: 768px)');
  const colorScheme = useColorScheme();
  const docVisibility = useDocumentVisibility();
  const orientation = useOrientation();
  const reducedMotion = useReducedMotion();
  const [pageLeft, setPageLeft] = useState(false);
  usePageLeave(() => setPageLeft(true));

  // ─── Timing ─────────────────────────────────────────────────
  const interval = useInterval(() => handlers.increment(), 1000);
  const { start: startTimeout, clear: clearTimeout_ } = useTimeout(() => {}, 3000);

  // ─── Move hook ──────────────────────────────────────────────
  const [moveValue, setMoveValue] = useState({ x: 0.5, y: 0.5 });
  const { ref: moveRef } = useMove(setMoveValue);

  // ─── Hash ───────────────────────────────────────────────────
  const [hash, setHash] = useHash();

  // ─── Pagination ─────────────────────────────────────────────
  const pagination = usePagination({ total: 10, initialPage: 1 });

  // ─── Fullscreen ─────────────────────────────────────────────
  const { ref: fsRef, toggle: toggleFs, fullscreen } = useFullscreenElement<HTMLDivElement>();

  // ─── Fetch ──────────────────────────────────────────────────
  const { data: fetchData, loading: fetchLoading } = useFetch<{ fact: string }>(
    'https://catfact.ninja/fact',
  );

  // ─── Favicon ────────────────────────────────────────────────
  useFavicon('/favicon.ico');

  // ─── Logger & Title ─────────────────────────────────────────
  useLogger('HooksPage', [count]);
  useDocumentTitle('Hooks — MALUI Demo');

  // ─── Hotkeys ────────────────────────────────────────────────
  useHotkeys([['mod+B', toggle]]);
  useWindowEvent('click', () => {});

  // ─── Eye dropper ────────────────────────────────────────────
  const { supported: eyeDropperSupported } = useEyeDropper();

  return (
    <Stack gap="lg">
      <Title order={2}>Hooks</Title>
      <Text size="sm" c="dimmed">
        Demonstrating 60+ hooks from mal-ui/hooks
      </Text>

      {/* ─── State & UI ─────────────────────────────────────── */}
      <Section title="State & UI">
        <Group>
          <Button onClick={toggle}>useDisclosure ({String(opened)})</Button>
          <Kbd>⌘B</Kbd>
          <Text size="sm">toggles via useHotkeys</Text>
        </Group>
        <Group>
          <Button onClick={handlers.increment}>+</Button>
          <Button onClick={handlers.decrement}>-</Button>
          <Button onClick={handlers.reset}>reset</Button>
          <Badge>useCounter: {count}</Badge>
        </Group>
        <Group>
          <Button onClick={() => setToggled()}>useToggle: {toggled}</Button>
          <Button onClick={forceUpdate}>useForceUpdate</Button>
          <Badge>useId: {id}</Badge>
          <Badge color={isFirstRender ? 'red' : 'green'}>
            isFirstRender: {String(isFirstRender)}
          </Badge>
        </Group>
      </Section>

      {/* ─── Input & Debouncing ─────────────────────────────── */}
      <Section title="Input, Debouncing & Throttling">
        <TextInput
          label="Type here (useDebouncedValue 400ms + useThrottledValue 500ms)"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Group>
          <Text size="sm">
            debounced: <Code>{debounced || '∅'}</Code>
          </Text>
          <Text size="sm">
            throttled: <Code>{throttled || '∅'}</Code>
          </Text>
          <Text size="sm">
            previous: <Code>{previous || '∅'}</Code>
          </Text>
        </Group>
        <TextInput label="useInputState" value={inputVal} onChange={setInputVal} />
        <TextInput
          label="useDebouncedState (400ms)"
          defaultValue={debouncedState}
          onChange={(e) => setDebouncedState(e.currentTarget.value)}
        />
        <TextInput
          label="useUncontrolled"
          value={uncontrolled}
          onChange={(e) => setUncontrolled(e.currentTarget.value)}
        />
      </Section>

      {/* ─── Clipboard ──────────────────────────────────────── */}
      <Section title="Clipboard & EyeDropper">
        <Group>
          <Button onClick={() => clipboard.copy('Copied from mal-ui!')}>
            {clipboard.copied ? 'Copied ✓' : 'useClipboard → copy'}
          </Button>
          <Badge color={eyeDropperSupported ? 'green' : 'red'}>
            useEyeDropper: {eyeDropperSupported ? 'supported' : 'not supported'}
          </Badge>
        </Group>
      </Section>

      {/* ─── Collections ────────────────────────────────────── */}
      <Section title="Collections (useListState, useMap, useSet, useQueue, useSetState, useStateHistory)">
        <Text fw={600} size="sm">
          useListState
        </Text>
        <Group>
          {list.map((item, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: demo list may contain duplicates
            <Badge key={i}>{item}</Badge>
          ))}
          <Button size="xs" onClick={() => listHandlers.append('New')}>
            append
          </Button>
          <Button size="xs" onClick={() => listHandlers.pop()}>
            pop
          </Button>
        </Group>

        <Text fw={600} size="sm">
          useMap
        </Text>
        <Group>
          {[...mapHook.entries()].map(([k, v]) => (
            <Badge key={k}>
              {k}: {v}
            </Badge>
          ))}
          <Button size="xs" onClick={() => mapHook.set('oranges', 7)}>
            set oranges=7
          </Button>
        </Group>

        <Text fw={600} size="sm">
          useSet
        </Text>
        <Group>
          {[...setHook].map((v) => (
            <Badge key={v}>{v}</Badge>
          ))}
          <Button size="xs" onClick={() => setHook.add('hooks')}>
            add 'hooks'
          </Button>
        </Group>

        <Text fw={600} size="sm">
          useQueue (limit 3)
        </Text>
        <Group>
          {queueHook.state.map((v: string, i: number) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: demo queue may contain duplicates
            <Badge key={i}>{v}</Badge>
          ))}
          <Button size="xs" onClick={() => queueHook.add(`#${queueHook.state.length + 1}`)}>
            add
          </Button>
          <Button size="xs" onClick={() => queueHook.update((s: string[]) => s.slice(1))}>
            shift
          </Button>
        </Group>

        <Text fw={600} size="sm">
          useSetState
        </Text>
        <Group>
          <Code>{JSON.stringify(stateObj)}</Code>
          <Button size="xs" onClick={() => setStateObj({ age: stateObj.age + 1 })}>
            age++
          </Button>
        </Group>

        <Text fw={600} size="sm">
          useStateHistory
        </Text>
        <Group>
          <Badge>current: {historyValue}</Badge>
          <Button size="xs" onClick={() => historyHandlers.set(historyValue + 1)}>
            +1
          </Button>
          <Button size="xs" onClick={() => historyHandlers.back()}>
            undo
          </Button>
          <Button size="xs" onClick={() => historyHandlers.forward()}>
            redo
          </Button>
        </Group>
      </Section>

      {/* ─── Storage ────────────────────────────────────────── */}
      <Section title="Storage (useLocalStorage, useSessionStorage)">
        <TextInput
          label="useLocalStorage (key: mal-demo-hooks)"
          value={stored}
          onChange={(e) => setStored(e.currentTarget.value)}
        />
        <TextInput
          label="useSessionStorage (key: mal-session)"
          value={sessionStored}
          onChange={(e) => setSessionStored(e.currentTarget.value)}
        />
      </Section>

      {/* ─── DOM / Element ──────────────────────────────────── */}
      <Section title="DOM & Element">
        <div
          ref={sizeRef}
          style={{
            resize: 'both',
            overflow: 'auto',
            border: '1px dashed var(--mantine-color-dimmed)',
            padding: 8,
          }}
        >
          useElementSize → {Math.round(width)} × {Math.round(height)}
        </div>

        <Paper
          ref={hoverRef}
          withBorder
          p="sm"
          bg={hovered ? 'var(--mantine-color-blue-light)' : undefined}
        >
          useHover: {hovered ? '✓ hovered' : 'hover me'}
        </Paper>

        <Paper
          ref={focusRef}
          withBorder
          p="sm"
          bg={focused ? 'var(--mantine-color-green-light)' : undefined}
        >
          <TextInput placeholder="useFocusWithin — click here" />
          <Text size="xs">{focused ? 'focused!' : 'not focused'}</Text>
        </Paper>

        <Paper ref={inViewRef} withBorder p="sm">
          useInViewport: {inViewport ? 'visible ✓' : 'not visible'}
        </Paper>

        <Paper ref={mouseRef} withBorder p="sm">
          useMouse: x={mouseX}, y={mouseY}
        </Paper>

        <Paper ref={clickOutsideRef} withBorder p="sm">
          useClickOutside (logs to console)
        </Paper>

        <Group>
          <Button onClick={() => scrollIntoView()}>useScrollIntoView → scroll to target</Button>
        </Group>
        <div ref={targetRef}>
          <Badge>scroll target</Badge>
        </div>

        <Text size="sm">
          useTextSelection: <Code>{textSelection?.toString() || 'select some text'}</Code>
        </Text>
      </Section>

      {/* ─── Selection ──────────────────────────────────────── */}
      <Section title="useSelection">
        <Group>
          {['A', 'B', 'C', 'D', 'E'].map((item) => (
            <Button
              key={item}
              size="xs"
              variant={selected.includes(item) ? 'filled' : 'outline'}
              onClick={() => selectionHandlers.toggle(item)}
            >
              {item}
            </Button>
          ))}
          <Button
            size="xs"
            variant="light"
            onClick={() => selectionHandlers.setSelection(['A', 'B', 'C', 'D', 'E'])}
          >
            all
          </Button>
          <Button size="xs" variant="light" onClick={() => selectionHandlers.resetSelection()}>
            clear
          </Button>
        </Group>
        <Text size="sm">
          Selected: <Code>{JSON.stringify(selected)}</Code>
        </Text>
      </Section>

      {/* ─── Move ───────────────────────────────────────────── */}
      <Section title="useMove">
        <div
          ref={moveRef}
          style={{
            width: '100%',
            height: 100,
            background: `hsl(${moveValue.x * 360}, 80%, ${100 - moveValue.y * 60}%)`,
            borderRadius: 8,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${moveValue.x * 100}%`,
              top: `${moveValue.y * 100}%`,
              width: 16,
              height: 16,
              borderRadius: '50%',
              border: '2px solid white',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
        <Text size="sm">
          x: {moveValue.x.toFixed(2)}, y: {moveValue.y.toFixed(2)}
        </Text>
      </Section>

      {/* ─── Fullscreen ─────────────────────────────────────── */}
      <Section title="useFullscreenElement">
        <Paper
          ref={fsRef}
          withBorder
          p="md"
          bg={fullscreen ? 'var(--mantine-color-dark-7)' : undefined}
        >
          <Button onClick={toggleFs}>{fullscreen ? 'Exit fullscreen' : 'Go fullscreen'}</Button>
        </Paper>
      </Section>

      {/* ─── Pagination ─────────────────────────────────────── */}
      <Section title="usePagination">
        <Group>
          <Button size="xs" onClick={pagination.previous}>
            prev
          </Button>
          {pagination.range.map((item, i) =>
            item === 'dots' ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: pagination range has repeated dots
              <Text key={i}>…</Text>
            ) : (
              <Button
                // biome-ignore lint/suspicious/noArrayIndexKey: pagination range has repeated dots
                key={i}
                size="xs"
                variant={item === pagination.active ? 'filled' : 'default'}
                onClick={() => pagination.setPage(item)}
              >
                {item}
              </Button>
            ),
          )}
          <Button size="xs" onClick={pagination.next}>
            next
          </Button>
        </Group>
      </Section>

      {/* ─── Timing ─────────────────────────────────────────── */}
      <Section title="Timing (useInterval, useTimeout)">
        <Group>
          <Button onClick={interval.start} disabled={interval.active}>
            start interval (1s → counter++)
          </Button>
          <Button onClick={interval.stop} disabled={!interval.active}>
            stop
          </Button>
          <Badge>{interval.active ? 'running' : 'stopped'}</Badge>
        </Group>
        <Group>
          <Button onClick={startTimeout}>useTimeout (3s, logs)</Button>
          <Button onClick={clearTimeout_}>clear timeout</Button>
        </Group>
      </Section>

      {/* ─── Fetch ──────────────────────────────────────────── */}
      <Section title="useFetch">
        <Text size="sm">{fetchLoading ? 'Loading...' : (fetchData?.fact ?? 'No data')}</Text>
      </Section>

      {/* ─── Hash ───────────────────────────────────────────── */}
      <Section title="useHash">
        <Group>
          <Text size="sm">
            Current hash: <Code>{hash || '#(empty)'}</Code>
          </Text>
          <Button size="xs" onClick={() => setHash('#section-1')}>
            #section-1
          </Button>
          <Button size="xs" onClick={() => setHash('#section-2')}>
            #section-2
          </Button>
        </Group>
      </Section>

      {/* ─── Window / Document ──────────────────────────────── */}
      <Section title="Window & Document">
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
          <Badge>useOs: {os}</Badge>
          <Badge color={idle ? 'gray' : 'green'}>useIdle: {String(idle)}</Badge>
          <Badge color={network.online ? 'green' : 'red'}>
            network: {network.online ? 'online' : 'offline'}
          </Badge>
          <Badge>mediaQuery md+: {String(isWide)}</Badge>
          <Badge>colorScheme: {colorScheme}</Badge>
          <Badge>mounted: {String(mounted)}</Badge>
          <Badge>
            viewport: {vw}×{vh}
          </Badge>
          <Badge>scroll-y: {Math.round(scroll.y)}</Badge>
          <Badge>docVisibility: {docVisibility}</Badge>
          <Badge color={orientation.type?.includes('portrait') ? 'blue' : 'orange'}>
            orientation: {orientation.angle ?? 0}°
          </Badge>
          <Badge>reducedMotion: {String(reducedMotion)}</Badge>
          <Badge color={pageLeft ? 'red' : 'green'}>pageLeave: {String(pageLeft)}</Badge>
        </SimpleGrid>
        <Group>
          <Button size="xs" onClick={() => scrollTo({ y: 0 })}>
            scroll to top
          </Button>
        </Group>
      </Section>
    </Stack>
  );
}
