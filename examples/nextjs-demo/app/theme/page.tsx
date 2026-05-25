'use client';

import {
  Badge,
  Button,
  Card,
  Code,
  ColorSwatch,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from 'mal-ui/core';
import {
  malBreakpoints,
  malColorTokens,
  malFontSizes,
  malLineHeights,
  malRadiusTokens,
  malShadows,
  malSpacingTokens,
} from 'mal-ui/theme';

const COLOR_NAMES = [
  'mal-brand',
  'mal-secondary',
  'mal-success',
  'mal-warning',
  'mal-error',
  'mal-neutral',
] as const;

export default function ThemePage() {
  const theme = useMantineTheme();

  return (
    <Stack gap="lg">
      <Title order={2}>Theme tokens</Title>

      {/* ─── Color palettes ──────────────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Color Palettes</Title>
          {COLOR_NAMES.map((name) => (
            <Stack key={name} gap={4}>
              <Text fw={600} size="sm">{name}</Text>
              <Group gap={4}>
                {(theme.colors[name] ?? []).map((shade, i) => (
                  <Stack key={i} gap={2} align="center">
                    <ColorSwatch color={shade} size={32} />
                    <Text size="xs" c="dimmed">{i}</Text>
                  </Stack>
                ))}
              </Group>
            </Stack>
          ))}
        </Stack>
      </Card>

      {/* ─── Primary + auto-contrast ─────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Primary Color & Auto-Contrast</Title>
          <Text size="sm" c="dimmed">
            primaryColor: <Code>{theme.primaryColor}</Code> | primaryShade: light={String((theme.primaryShade as any).light)} dark={String((theme.primaryShade as any).dark)} | autoContrast: {String(theme.autoContrast)}
          </Text>
          <Group>
            <Button>Default</Button>
            <Button color="mal-secondary">Secondary</Button>
            <Button color="mal-success">Success</Button>
            <Button color="mal-warning">Warning</Button>
            <Button color="mal-error">Error</Button>
            <Button variant="gradient">Gradient</Button>
          </Group>
          <Group>
            <Badge color="mal-brand">Brand</Badge>
            <Badge color="mal-secondary">Secondary</Badge>
            <Badge color="mal-success">Success</Badge>
            <Badge color="mal-warning">Warning</Badge>
            <Badge color="mal-error">Error</Badge>
          </Group>
          <Group>
            <ThemeIcon color="mal-brand" size="lg"><span>B</span></ThemeIcon>
            <ThemeIcon color="mal-secondary" size="lg"><span>S</span></ThemeIcon>
            <ThemeIcon color="mal-success" size="lg"><span>✓</span></ThemeIcon>
            <ThemeIcon color="mal-warning" size="lg"><span>!</span></ThemeIcon>
            <ThemeIcon color="mal-error" size="lg"><span>✕</span></ThemeIcon>
          </Group>
        </Stack>
      </Card>

      {/* ─── Button variants ─────────────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Button Variants</Title>
          <Group>
            <Button variant="filled">Filled</Button>
            <Button variant="light">Light</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="transparent">Transparent</Button>
            <Button variant="white">White</Button>
            <Button variant="default">Default</Button>
            <Button variant="gradient">Gradient</Button>
          </Group>
        </Stack>
      </Card>

      {/* ─── Radius ──────────────────────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Radius</Title>
          <SimpleGrid cols={{ base: 2, sm: 5 }}>
            {Object.entries(theme.radius).map(([k, v]) => (
              <Card key={k} withBorder p="xs" radius={k} shadow="xs">
                <Text size="sm" fw={500}>{k}</Text>
                <Text size="xs" c="dimmed">{String(v)}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Card>

      {/* ─── Shadows ─────────────────────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Shadows</Title>
          <SimpleGrid cols={{ base: 2, sm: 5 }}>
            {Object.entries(theme.shadows).map(([k]) => (
              <Card key={k} p="sm" shadow={k} withBorder>
                <Text size="sm" fw={500}>{k}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Card>

      {/* ─── Spacing, Font Sizes, Line Heights ───────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Design Tokens</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm">Spacing</Text>
              <Code block>{JSON.stringify(malSpacingTokens, null, 2)}</Code>
            </Stack>
            <Stack gap="xs">
              <Text fw={600} size="sm">Font Sizes</Text>
              <Code block>{JSON.stringify(malFontSizes, null, 2)}</Code>
            </Stack>
            <Stack gap="xs">
              <Text fw={600} size="sm">Line Heights</Text>
              <Code block>{JSON.stringify(malLineHeights, null, 2)}</Code>
            </Stack>
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm">Shadows</Text>
              <Code block>{JSON.stringify(malShadows, null, 2)}</Code>
            </Stack>
            <Stack gap="xs">
              <Text fw={600} size="sm">Breakpoints</Text>
              <Code block>{JSON.stringify(malBreakpoints, null, 2)}</Code>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Card>

      {/* ─── Color tokens map ────────────────────────────────────────── */}
      <Card withBorder padding="md">
        <Stack>
          <Title order={4}>Color Token Map</Title>
          <Code block>{JSON.stringify(malColorTokens, null, 2)}</Code>
          <Title order={5}>Radius Tokens</Title>
          <Code block>{JSON.stringify(malRadiusTokens, null, 2)}</Code>
        </Stack>
      </Card>
    </Stack>
  );
}
