'use client';

import { Button, Card, Group, Stack, Title } from 'mal-ui/core';
import { nprogress } from 'mal-ui/nprogress';

export default function NprogressPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Navigation progress</Title>
      <Card withBorder padding="md">
        <Group>
          <Button onClick={() => nprogress.start()}>Start</Button>
          <Button onClick={() => nprogress.complete()}>Complete</Button>
          <Button onClick={() => nprogress.increment()}>+10%</Button>
          <Button onClick={() => nprogress.decrement()}>-10%</Button>
          <Button onClick={() => nprogress.set(50)}>Set 50%</Button>
          <Button color="red" onClick={() => nprogress.reset()}>
            Reset
          </Button>
        </Group>
      </Card>
    </Stack>
  );
}
