'use client';

import { CodeHighlight, CodeHighlightTabs, InlineCodeHighlight } from 'mal-ui/code-highlight';
import { Card, Stack, Text, Title } from 'mal-ui/core';

const ts = `import { Button } from 'mal-ui/core';\n\nexport default function App() {\n  return <Button>Hello</Button>;\n}`;
const css = '.btn { color: var(--mantine-color-blue-6); }';

export default function CodeHighlightPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Code highlight</Title>
      <Card withBorder padding="md">
        <Stack>
          <Text>
            Inline: install via <InlineCodeHighlight code="bun add mal-ui" language="bash" />
          </Text>
          <CodeHighlight code={ts} language="tsx" />
          <CodeHighlightTabs
            code={[
              { fileName: 'App.tsx', code: ts, language: 'tsx' },
              { fileName: 'styles.css', code: css, language: 'css' },
            ]}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
