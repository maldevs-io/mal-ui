'use client';

import { Card, Group, Stack, Text, Title } from 'mal-ui/core';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES, PDF_MIME_TYPE } from 'mal-ui/dropzone';
import { notifications } from 'mal-ui/notifications';
import { useState } from 'react';

export default function DropzonePage() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Stack gap="lg">
      <Title order={2}>Dropzone</Title>
      <Card withBorder padding="md">
        <Stack>
          <Dropzone
            onDrop={(f) => { setFiles(f); notifications.show({ title: 'Dropped', message: `${f.length} file(s)` }); }}
            onReject={() => notifications.show({ color: 'red', title: 'Rejected', message: 'Type or size invalid' })}
            maxSize={5 * 1024 ** 2}
            accept={[...IMAGE_MIME_TYPE, ...PDF_MIME_TYPE, MIME_TYPES.csv]}
          >
            <Group justify="center" p="xl">
              <Dropzone.Accept><Text>Drop files here</Text></Dropzone.Accept>
              <Dropzone.Reject><Text c="red">File rejected</Text></Dropzone.Reject>
              <Dropzone.Idle><Text>Drag images, PDFs or CSVs here, or click to pick</Text></Dropzone.Idle>
            </Group>
          </Dropzone>
          <Text size="sm">Selected: {files.map((f) => f.name).join(', ') || '∅'}</Text>
        </Stack>
      </Card>
    </Stack>
  );
}
