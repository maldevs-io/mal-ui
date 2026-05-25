'use client';

import { Button, Card, Group, Kbd, Stack, Text, Title } from 'mal-ui/core';
import { spotlight } from 'mal-ui/spotlight';

export default function SpotlightPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Spotlight</Title>
      <Card withBorder padding="md">
        <Stack>
          <Text>
            Press <Kbd>⌘K</Kbd> (or <Kbd>⌘J</Kbd>) anywhere to open the spotlight. It is registered
            globally in the app shell with one action per demo page.
          </Text>
          <Group>
            <Button onClick={() => spotlight.open()}>Open spotlight</Button>
            <Button variant="subtle" onClick={() => spotlight.close()}>Close</Button>
            <Button variant="light" onClick={() => spotlight.toggle()}>Toggle</Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
