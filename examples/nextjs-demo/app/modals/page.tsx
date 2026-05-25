'use client';

import { Button, Card, Group, Stack, Text, TextInput, Title } from 'mal-ui/core';
import { modals } from 'mal-ui/modals';
import { useState } from 'react';

export default function ModalsPage() {
  const [name, setName] = useState('');

  const openConfirm = () =>
    modals.openConfirmModal({
      title: 'Delete item?',
      children: <Text size="sm">This action cannot be undone.</Text>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => alert('Deleted'),
    });

  const openContent = () =>
    modals.open({
      title: 'Profile',
      children: (
        <Stack>
          <TextInput label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
          <Button onClick={() => modals.closeAll()}>Save</Button>
        </Stack>
      ),
    });

  return (
    <Stack gap="lg">
      <Title order={2}>Modals</Title>
      <Card withBorder padding="md">
        <Group>
          <Button onClick={openConfirm}>Confirm modal</Button>
          <Button onClick={openContent}>Content modal</Button>
        </Group>
        <Text mt="md" size="sm" c="dimmed">Last name input: {name || '∅'}</Text>
      </Card>
    </Stack>
  );
}
