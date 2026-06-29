'use client';

// Custom MAL UI components extending @mantine/nprogress.
//
// Adds a framework-agnostic navigation progress integration on top of the
// Mantine `nprogress` bar:
//   • `NavigationProgressProvider` — renders the bar and auto-starts/completes
//     progress for link clicks and History API navigations ("the navigator").
//   • `Link` — a polymorphic anchor that triggers progress on click.
//   • `useRouter` — a progress-aware router wrapper for programmatic navigation.
//
// None of this depends on Next.js: the navigator works through the DOM
// (click + History API), and `useRouter` wraps whatever router you give it
// (e.g. Next.js `useRouter()`), falling back to the History API otherwise.

import { NavigationProgress, type NavigationProgressProps, nprogress } from '@mantine/nprogress';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
} from 'react';

// ─── Internal navigation state ──────────────────────────────────────────────
// Tracks whether a navigation we started is in flight, so the History patch
// only completes the bar for transitions we actually triggered.
let isNavigating = false;

function startProgress() {
  isNavigating = true;
  nprogress.start();
}

function completeProgress() {
  if (!isNavigating) return;
  isNavigating = false;
  nprogress.complete();
}

// ─── URL / event guards ─────────────────────────────────────────────────────
const NON_NAVIGABLE_SCHEME = /^(tel:|mailto:|sms:|blob:|javascript:|#)/i;

interface ClickLikeEvent {
  button?: number;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
}

function isModifierClick(event: ClickLikeEvent) {
  return Boolean(
    event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (event.button != null && event.button !== 0),
  );
}

/** Returns `true` when `href` points to an internal route worth showing progress for. */
function isInternalNavigable(href: string | null | undefined) {
  if (!href || typeof window === 'undefined') return false;
  if (NON_NAVIGABLE_SCHEME.test(href)) return false;
  try {
    const url = new URL(href, window.location.href);
    // External links and links to a different host are skipped by design.
    if (url.origin !== window.location.origin) return false;
    // Same page (hash-only change or identical URL) is not a route transition.
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ─── Global navigation listeners (click + History API) ──────────────────────
let listenerCount = 0;
let removeListeners: (() => void) | null = null;

function handleDocumentClick(event: MouseEvent) {
  if (event.defaultPrevented || isModifierClick(event)) return;
  const target = event.target as Element | null;
  const anchor = target?.closest?.('a');
  if (!anchor) return;
  const linkTarget = anchor.getAttribute('target');
  if (linkTarget && linkTarget !== '_self') return;
  if (anchor.hasAttribute('download')) return;
  if (!isInternalNavigable(anchor.getAttribute('href'))) return;
  startProgress();
}

function releaseNavigationListeners() {
  listenerCount = Math.max(0, listenerCount - 1);
  if (listenerCount === 0 && removeListeners) {
    removeListeners();
    removeListeners = null;
  }
}

/**
 * Installs global click + History API listeners once (reference-counted).
 * Returns a releaser that removes them when the last consumer unmounts.
 */
function installNavigationListeners() {
  if (typeof window === 'undefined') return () => {};
  listenerCount += 1;
  if (listenerCount > 1) return releaseNavigationListeners;

  document.addEventListener('click', handleDocumentClick, true);

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(
    ...args: Parameters<typeof originalPushState>
  ): void {
    originalPushState.apply(window.history, args);
    completeProgress();
  };
  window.history.replaceState = function replaceState(
    ...args: Parameters<typeof originalReplaceState>
  ): void {
    originalReplaceState.apply(window.history, args);
    completeProgress();
  };

  window.addEventListener('popstate', completeProgress);
  window.addEventListener('pagehide', completeProgress);

  removeListeners = () => {
    document.removeEventListener('click', handleDocumentClick, true);
    window.history.pushState = originalPushState;
    window.history.replaceState = originalReplaceState;
    window.removeEventListener('popstate', completeProgress);
    window.removeEventListener('pagehide', completeProgress);
  };

  return releaseNavigationListeners;
}

// ─── Router context ─────────────────────────────────────────────────────────
export interface NavigateOptions {
  scroll?: boolean;
}

/** Minimal router shape — compatible with Next.js `AppRouterInstance`. */
export interface ProgressRouterBase {
  push(href: string, options?: NavigateOptions): void;
  replace(href: string, options?: NavigateOptions): void;
  back?(): void;
  forward?(): void;
  refresh?(): void;
  prefetch?(href: string, options?: unknown): void;
}

const NavigationProgressRouterContext = createContext<ProgressRouterBase | null>(null);

// ─── NavigationProgressProvider ─────────────────────────────────────────────
export interface NavigationProgressProviderProps extends NavigationProgressProps {
  /**
   * Router used by `useRouter()` for progress-aware programmatic navigation,
   * e.g. Next.js `useRouter()` from `next/navigation`.
   */
  router?: ProgressRouterBase;
  /** Subtree to wrap so `useRouter()` can read `router` from context. */
  children?: ReactNode;
}

/**
 * Renders the navigation progress bar and wires up automatic progress for link
 * clicks and History API navigations. Render once near the root of your app.
 */
export function NavigationProgressProvider({
  router,
  children,
  ...barProps
}: NavigationProgressProviderProps) {
  useEffect(() => installNavigationListeners(), []);

  return (
    <NavigationProgressRouterContext.Provider value={router ?? null}>
      <NavigationProgress {...barProps} />
      {children}
    </NavigationProgressRouterContext.Provider>
  );
}

// ─── Link ───────────────────────────────────────────────────────────────────
export type LinkProps<C extends ElementType = 'a'> = {
  /** Element or component to render. Defaults to `'a'`. Pass e.g. Next.js `Link`. */
  component?: C;
  href?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, 'component' | 'href' | 'children'>;

/**
 * Polymorphic link that starts navigation progress when clicked. Use the
 * `component` prop to delegate to a framework link for client-side routing:
 * `<Link component={NextLink} href="/dashboard">Go</Link>`.
 */
export function Link<C extends ElementType = 'a'>({
  component,
  href,
  children,
  ...others
}: LinkProps<C>) {
  const Component = (component ?? 'a') as ElementType;
  const userOnClick = (others as { onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void })
    .onClick;

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    userOnClick?.(event);
    if (!event.defaultPrevented && !isModifierClick(event) && isInternalNavigable(href)) {
      startProgress();
    }
  };

  return createElement(Component, { ...others, href, onClick: handleClick }, children);
}

// ─── useRouter ──────────────────────────────────────────────────────────────
export interface ProgressRouter extends ProgressRouterBase {
  back(): void;
  forward(): void;
  refresh(): void;
  prefetch(href: string, options?: unknown): void;
}

/**
 * Progress-aware router. Wraps the router passed via argument or from
 * `NavigationProgressProvider`'s `router` prop; falls back to the History API.
 * `push`/`replace`/`back`/`forward` show the progress bar; the navigator
 * completes it once navigation settles.
 */
export function useRouter(baseRouter?: ProgressRouterBase): ProgressRouter {
  const contextRouter = useContext(NavigationProgressRouterContext);
  const base = baseRouter ?? contextRouter ?? undefined;

  return useMemo<ProgressRouter>(() => {
    const navigate = (method: 'push' | 'replace', href: string, options?: NavigateOptions) => {
      startProgress();
      if (base) {
        base[method](href, options);
      } else if (typeof window !== 'undefined') {
        window.history[method === 'push' ? 'pushState' : 'replaceState']({}, '', href);
      }
    };

    return {
      push: (href, options) => navigate('push', href, options),
      replace: (href, options) => navigate('replace', href, options),
      back: () => {
        startProgress();
        if (base?.back) base.back();
        else if (typeof window !== 'undefined') window.history.back();
      },
      forward: () => {
        startProgress();
        if (base?.forward) base.forward();
        else if (typeof window !== 'undefined') window.history.forward();
      },
      refresh: () => base?.refresh?.(),
      prefetch: (href, options) => base?.prefetch?.(href, options),
    };
  }, [base]);
}
