'use client';

import { AppShell, Burger, Group, NavLink, ScrollArea, Text, Title } from 'mal-ui/core';
import { useDisclosure } from 'mal-ui/hooks';
import { Spotlight, spotlight } from 'mal-ui/spotlight';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const ROUTES = [
  { href: '/', label: 'Overview' },
  { href: '/core', label: 'Core components' },
  { href: '/hooks', label: 'Hooks' },
  { href: '/form', label: 'Form' },
  { href: '/charts', label: 'Charts' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/modals', label: 'Modals' },
  { href: '/spotlight', label: 'Spotlight' },
  { href: '/code-highlight', label: 'Code highlight' },
  { href: '/tiptap', label: 'Tiptap editor' },
  { href: '/dropzone', label: 'Dropzone' },
  { href: '/carousel', label: 'Carousel' },
  { href: '/nprogress', label: 'Nprogress' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/theme', label: 'Theme tokens' },
];

export function Shell({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <Spotlight
        actions={ROUTES.map((r) => ({
          id: r.href,
          label: r.label,
          description: `Go to ${r.label}`,
          onClick: () => router.push(r.href),
        }))}
        searchProps={{ placeholder: 'Search demos…' }}
        shortcut={['mod+K', 'mod+J']}
        nothingFound="Nothing here"
        highlightQuery
      />
      <AppShell
        header={{ height: 56 }}
        navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={4}>MAL UI Demo</Title>
            </Group>
            <Text size="sm" c="dimmed" onClick={() => spotlight.open()} style={{ cursor: 'pointer' }}>
              Press ⌘K to search
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="xs">
          <ScrollArea>
            {ROUTES.map((r) => (
              <NavLink
                key={r.href}
                label={r.label}
                active={pathname === r.href}
                onClick={() => router.push(r.href)}
              />
            ))}
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
