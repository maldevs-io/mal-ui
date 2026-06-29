'use client';

import { Button, Card, Group, Stack, Text, Title } from 'mal-ui/core';
import { Link, nprogress, useRouter } from 'mal-ui/nprogress';
import NextLink from 'next/link';

export default function NprogressPage() {
  const router = useRouter();

  return (
    <Stack gap="lg">
      <Title order={2}>Navigation progress</Title>

      <Card withBorder padding="md">
        <Stack gap="sm">
          <Title order={4}>Automatic on navigation</Title>
          <Text size="sm" c="dimmed">
            The bar starts automatically when you click any internal link or navigate
            programmatically, and completes once the route settles.
          </Text>
          <Group>
            <Link component={NextLink} href="/core">
              Link to Core
            </Link>
            <Link component={NextLink} href="/charts">
              Link to Charts
            </Link>
            <Link component={NextLink} href="/hooks">
              Link to Hooks
            </Link>
          </Group>
          <Group>
            <Button onClick={() => router.push('/form')}>router.push('/form')</Button>
            <Button variant="light" onClick={() => router.push('/dates')}>
              router.push('/dates')
            </Button>
            <Button variant="default" onClick={() => router.back()}>
              router.back()
            </Button>
          </Group>
        </Stack>
      </Card>

      <Card withBorder padding="md">
        <Stack gap="sm">
          <Title order={4}>Manual control</Title>
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
        </Stack>
      </Card>
    </Stack>
  );
}
