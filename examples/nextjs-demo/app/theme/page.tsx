'use client';

import {
  Card,
  Code,
  ColorSwatch,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from 'mal-ui/core';
import { malColorTokens, malRadiusTokens, malSpacingTokens } from 'mal-ui/theme';

export default function ThemePage() {
  const theme = useMantineTheme();

  return (
    <Stack gap="lg">
      <Title order={2}>Theme tokens</Title>

      <Card withBorder padding="md">
        <Stack>
          <Title order={5}>Colors</Title>
          <Code block>{JSON.stringify(malColorTokens, null, 2)}</Code>
          <Title order={5}>Radius</Title>
          <Code block>{JSON.stringify(malRadiusTokens, null, 2)}</Code>
          <Title order={5}>Spacing</Title>
          <Code block>{JSON.stringify(malSpacingTokens, null, 2)}</Code>
        </Stack>
      </Card>

      <Card withBorder padding="md">
        <Stack>
          <Title order={5}>Primary color shades — {theme.primaryColor}</Title>
          <Group>
            {(theme.colors[theme.primaryColor] ?? []).map((shade, i) => (
              <Stack key={shade} gap={2} align="center">
                <ColorSwatch color={shade} />
                <Text size="xs">{i}</Text>
              </Stack>
            ))}
          </Group>
          <SimpleGrid cols={{ base: 2, sm: 5 }}>
            {Object.entries(theme.radius).map(([k, v]) => (
              <Card key={k} withBorder p="xs" radius={k}>
                <Text size="xs">radius {k} ({String(v)})</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
}
