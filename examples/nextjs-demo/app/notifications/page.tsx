'use client';

import { Button, Card, Group, Stack, Title } from 'mal-ui/core';
import { notifications } from 'mal-ui/notifications';

export default function NotificationsPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Notifications</Title>
      <Card withBorder padding="md">
        <Group>
          <Button onClick={() => notifications.show({ title: 'Default', message: 'Hello there' })}>
            Show default
          </Button>
          <Button color="green" onClick={() => notifications.show({ title: 'Success', message: 'Saved', color: 'green' })}>
            Success
          </Button>
          <Button color="red" onClick={() => notifications.show({ title: 'Error', message: 'Failed', color: 'red' })}>
            Error
          </Button>
          <Button variant="light" onClick={() => {
            const id = notifications.show({ loading: true, title: 'Saving…', message: 'Please wait', autoClose: false });
            setTimeout(() => notifications.update({ id, loading: false, title: 'Done', message: 'Saved', color: 'green', autoClose: 2000 }), 1500);
          }}>
            Async update
          </Button>
          <Button variant="subtle" onClick={() => notifications.clean()}>Clear all</Button>
        </Group>
      </Card>
    </Stack>
  );
}
