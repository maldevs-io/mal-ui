import { describe, expect, test } from 'bun:test';

/**
 * Smoke test: ensure every mal-ui subpath resolves and exposes
 * a few well-known exports from the underlying source.
 */

describe('mal-ui subpaths resolve', () => {
  test('core', async () => {
    const m: any = await import('../src/core');
    expect(m.Button).toBeDefined();
    expect(m.MantineProvider).toBeDefined();
    expect(typeof m.createTheme).toBe('function');
  });

  test('hooks', async () => {
    const m: any = await import('../src/hooks');
    expect(typeof m.useDisclosure).toBe('function');
    expect(typeof m.useDebouncedValue).toBe('function');
  });

  test('form', async () => {
    const m: any = await import('../src/form');
    expect(typeof m.useForm).toBe('function');
  });

  test('notifications', async () => {
    const m: any = await import('../src/notifications');
    expect(m.notifications).toBeDefined();
    expect(m.Notifications).toBeDefined();
  });

  test('modals', async () => {
    const m: any = await import('../src/modals');
    expect(m.modals).toBeDefined();
    expect(m.ModalsProvider).toBeDefined();
  });

  test('spotlight', async () => {
    const m: any = await import('../src/spotlight');
    expect(m.Spotlight).toBeDefined();
  });

  test('nprogress', async () => {
    const m: any = await import('../src/nprogress');
    expect(m.nprogress).toBeDefined();
    expect(m.NavigationProgress).toBeDefined();
  });

  test('code-highlight', async () => {
    const m: any = await import('../src/code-highlight');
    expect(m.CodeHighlight).toBeDefined();
  });

  test('dropzone', async () => {
    const m: any = await import('../src/dropzone');
    expect(m.Dropzone).toBeDefined();
  });

  test('carousel', async () => {
    const m: any = await import('../src/carousel');
    expect(m.Carousel).toBeDefined();
  });

  test('charts', async () => {
    const m: any = await import('../src/charts');
    expect(m.LineChart).toBeDefined();
    expect(m.BarChart).toBeDefined();
  });

  test('tiptap', async () => {
    const m: any = await import('../src/tiptap');
    expect(m.RichTextEditor).toBeDefined();
  });

  test('schedule', async () => {
    const m: any = await import('../src/schedule');
    expect(m.Schedule).toBeDefined();
  });

  test('dates', async () => {
    const m: any = await import('../src/dates');
    expect(m.DatePicker).toBeDefined();
    expect(m.Calendar).toBeDefined();
    expect(m.DatesProvider).toBeDefined();
  });

  test('theme', async () => {
    const m: any = await import('../src/theme');
    expect(m.malTheme).toBeDefined();
    expect(m.malColorTokens.primary).toBe('mal-brand');
  });

  test('root index', async () => {
    const m: any = await import('../src/index');
    expect(m.Button).toBeDefined();
    expect(typeof m.useDisclosure).toBe('function');
  });
});
