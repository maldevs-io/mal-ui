# Accessibility

MAL UI should stay accessible by default. Because this library is built on
Mantine, many primitives already include accessibility behavior. Contributors
still need to preserve it when adding wrappers, aliases, examples, or custom
components.

## Expectations

- Use semantic HTML through Mantine components whenever possible.
- Keep visible labels or accessible names for interactive controls.
- Preserve keyboard navigation and focus indicators.
- Do not remove ARIA attributes supplied by Mantine unless replacing them with a
  correct equivalent.
- Respect reduced motion preferences.
- Check color contrast when adding theme tokens or examples.
- Test loading, disabled, error, and empty states where relevant.

## Pull Requests

For UI changes, include notes about:

- Keyboard behavior.
- Screen reader labels or accessible names.
- Color contrast considerations.
- Any known limitations.

## Examples

Demo pages should model accessible usage. Prefer labeled inputs, descriptive
button text, and clear validation messages.
