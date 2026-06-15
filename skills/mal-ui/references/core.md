# mal-ui Core Reference (`mal-ui/core`)

`mal-ui/core` provides all components plus `MALUI*` aliases for
the theming identifiers. Every component's props, variants, Styles API selectors,
and behavior are documented below.

```tsx
import { Button, TextInput, Card, Group, Stack } from "mal-ui/core";
```

> Root `mal-ui` re-exports `core` + `hooks`, so `import { Button } from 'mal-ui'`
> also works. Prefer the explicit `mal-ui/core` subpath.

---

## Shared style props (on almost every component)

Most components accept these props (via the `Box` polymorphic base). Values can be
theme tokens (`"md"`), numbers (converted to rem), or any valid CSS value.

| Prop                                    | Type                                        | Description                                |
| --------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my` | `MantineSpacing \| number \| (string & {})` | Margin (token, number→rem, or CSS)         |
| `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py` | `MantineSpacing \| number`                  | Padding                                    |
| `w`, `miw`, `maw`                       | `React.CSSProperties['width']`              | Width / min / max width                    |
| `h`, `mih`, `mah`                       | `React.CSSProperties['height']`             | Height / min / max height                  |
| `bg`                                    | `MantineColor`                              | Background color                           |
| `c`                                     | `MantineColor`                              | Text color                                 |
| `bd`                                    | `string`                                    | Border shorthand, e.g. `"1px solid red"`   |
| `opacity`                               | `number`                                    | Opacity                                    |
| `ta`                                    | `CSS text-align`                            | Text align                                 |
| `fz`                                    | `MantineFontSize \| number`                 | Font size                                  |
| `fw`                                    | `CSS font-weight`                           | Font weight                                |
| `lh`                                    | `MantineLineHeight`                         | Line height                                |
| `pos`                                   | `CSS position`                              | Position                                   |
| `top`/`left`/`right`/`bottom`/`inset`   | CSS                                         | Offsets                                    |
| `display`                               | CSS display                                 | Display                                    |
| `style`                                 | `MantineStyleProp`                          | Inline style object or array               |
| `className`                             | `string`                                    | Custom class                               |
| `classNames` / `styles`                 | Styles API record                           | Per-element class names / styles           |
| `hiddenFrom` / `visibleFrom`            | `MantineBreakpoint`                         | Responsive hide/show                       |
| `component`                             | `React.ElementType`                         | Polymorphic root element (`component="a"`) |
| `renderRoot`                            | `(props) => ReactNode`                      | Custom root renderer                       |

Responsive style props accept an object keyed by breakpoint, e.g.
`p={{ base: 'sm', md: 'lg' }}`.

---

## Common value types

| Type                      | Accepted values                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `MantineSize`             | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` (string)                                                       |
| `MantineColor`            | theme color name (`"mal-brand"`, `"mal-brand.5"`, `"red"`) or any CSS color                           |
| `MantineRadius`           | `MantineSize \| number` (number → rem)                                                                |
| `MantineSpacing`          | `MantineSize \| number`                                                                               |
| `MantineGradient`         | `{ from: MantineColor; to: MantineColor; deg?: number }`                                              |
| `MantineNumberSize`       | `MantineSize \| number`                                                                               |
| variant (most components) | `"filled" \| "light" \| "outline" \| "subtle" \| "transparent" \| "white" \| "default" \| "gradient"` |

For exhaustive prop tables, Styles API selectors, CSS variables, and demos of any
single component, search the bundled `llm.md` (repo root) for `### <ComponentName>`
or see [component-api.md](./component-api.md).

---

## Component catalog by category

### Layout

| Component                                                                     | Use                                 | Key props                                      |
| ----------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------- |
| `AppShell` (+ `.Header`, `.Navbar`, `.Aside`, `.Footer`, `.Main`, `.Section`) | App scaffolding with header/sidebar | `header`, `navbar`, `padding`, `layout`        |
| `Container`                                                                   | Centered max-width content          | `size`, `fluid`                                |
| `Grid` (+ `.Col`)                                                             | 12-column responsive grid           | `gutter`, `columns`, `span`, `offset`          |
| `SimpleGrid`                                                                  | Equal-width responsive columns      | `cols`, `spacing`, `verticalSpacing`           |
| `Group`                                                                       | Horizontal flex row                 | `justify`, `align`, `gap`, `wrap`, `grow`      |
| `Stack`                                                                       | Vertical flex column                | `justify`, `align`, `gap`                      |
| `Flex`                                                                        | Generic flexbox                     | `direction`, `gap`, `justify`, `align`, `wrap` |
| `Center`                                                                      | Center child(ren)                   | `inline`                                       |
| `Space`                                                                       | Empty spacer                        | `w`, `h`                                       |
| `Box`                                                                         | Polymorphic base element            | all style props                                |
| `AspectRatio`                                                                 | Maintain ratio                      | `ratio`                                        |
| `ScrollArea` (+ `.Autosize`)                                                  | Custom scrollbars                   | `type`, `scrollbarSize`, `offsetScrollbars`    |

### Buttons & actions

| Component                                  | Use                           | Key props                                                                                                           |
| ------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Button` (+ `.Group`)                      | Primary action button         | `variant`, `color`, `size`, `radius`, `leftSection`, `rightSection`, `loading`, `disabled`, `fullWidth`, `gradient` |
| `ActionIcon` (+ `.Group`, `.GroupSection`) | Icon-only button              | `variant`, `color`, `size`, `loading`, `disabled`, `aria-label`                                                     |
| `CloseButton`                              | Standard close X              | `size`, `variant`, `iconSize`                                                                                       |
| `UnstyledButton`                           | Button with no styles         | style props                                                                                                         |
| `CopyButton`                               | Copy-to-clipboard render prop | `value`, `timeout`                                                                                                  |
| `FileButton`                               | Native file picker trigger    | `onChange`, `accept`, `multiple`                                                                                    |

### Inputs & form controls

| Component                                      | Use                           | Notable value type                                                                      |
| ---------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| `TextInput`                                    | Single-line text              | `value: string`                                                                         |
| `Textarea`                                     | Multi-line text               | `autosize`, `minRows`, `maxRows`                                                        |
| `PasswordInput`                                | Password w/ visibility toggle | `value: string`                                                                         |
| `NumberInput`                                  | Numeric input                 | `value: number \| string`, `min`, `max`, `step`, `clampBehavior`, `decimalScale`        |
| `JsonInput`                                    | JSON textarea w/ validation   | `validationError`, `formatOnBlur`                                                       |
| `Select`                                       | Single-choice dropdown        | `data: (string \| {value,label})[]`, `value: string \| null`, `searchable`, `clearable` |
| `MultiSelect`                                  | Multi-choice dropdown         | `value: string[]`                                                                       |
| `Autocomplete`                                 | Free text + suggestions       | `data`, `value: string`                                                                 |
| `TagsInput`                                    | Free-form tags                | `value: string[]`                                                                       |
| `Combobox` (+ many parts)                      | Headless dropdown primitive   | `store`, `onOptionSubmit`                                                               |
| `Checkbox` (+ `.Group`, `.Indicator`, `.Card`) | Boolean / set                 | `checked: boolean`, `indeterminate`                                                     |
| `Radio` (+ `.Group`, `.Card`, `.Indicator`)    | Single from set               | `value: string`                                                                         |
| `Switch` (+ `.Group`)                          | Toggle                        | `checked: boolean`, `onLabel`, `offLabel`                                               |
| `Chip` (+ `.Group`)                            | Selectable pill               | `checked: boolean`, `value`                                                             |
| `SegmentedControl`                             | Inline option switch          | `data`, `value: string`                                                                 |
| `Slider` / `RangeSlider`                       | Numeric slider                | `value: number` / `[number,number]`, `min`, `max`, `step`, `marks`                      |
| `Rating`                                       | Star rating                   | `value: number`, `count`, `fractions`                                                   |
| `PinInput`                                     | Code/OTP entry                | `length`, `value: string`, `type`, `mask`                                               |
| `ColorInput`                                   | Color picker input            | `value: string`, `format`, `swatches`                                                   |
| `ColorPicker`                                  | Standalone picker             | `value`, `format`, `swatches`                                                           |
| `NativeSelect`                                 | Native `<select>`             | `data`, `value`                                                                         |
| `Fieldset`                                     | Group of inputs               | `legend`, `variant`                                                                     |
| `Input` / `Input.Wrapper`                      | Low-level input base          | `leftSection`, `rightSection`, `error`                                                  |

Common input props: `label`, `description`, `error`, `placeholder`, `required`,
`withAsterisk`, `disabled`, `size`, `radius`, `variant`
(`"default" \| "filled" \| "unstyled"`), `leftSection`, `rightSection`,
`onChange`, `value`/`defaultValue`.

### Data display

| Component                                                                           | Use                    | Key props                                                     |
| ----------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| `Card` (+ `.Section`)                                                               | Content container      | `shadow`, `padding`, `radius`, `withBorder`                   |
| `Paper`                                                                             | Surface with elevation | `shadow`, `radius`, `withBorder`, `p`                         |
| `Badge`                                                                             | Status pill            | `variant`, `color`, `size`, `radius`, `leftSection`, `circle` |
| `Avatar` (+ `.Group`)                                                               | User image/initials    | `src`, `alt`, `color`, `radius`, `size`, `name`               |
| `Indicator`                                                                         | Dot/count overlay      | `label`, `color`, `position`, `processing`, `disabled`        |
| `Table` (+ `.Thead`, `.Tbody`, `.Tr`, `.Td`, `.Th`, `.Caption`, `.ScrollContainer`) | Data tables            | `striped`, `highlightOnHover`, `withTableBorder`, `data`      |
| `Accordion` (+ `.Item`, `.Control`, `.Panel`)                                       | Collapsible sections   | `multiple`, `value`, `variant`, `chevronPosition`             |
| `Timeline` (+ `.Item`)                                                              | Vertical timeline      | `active`, `bulletSize`, `lineWidth`                           |
| `List` (+ `.Item`)                                                                  | Ordered/unordered list | `type`, `spacing`, `icon`, `withPadding`                      |
| `ThemeIcon`                                                                         | Colored icon box       | `variant`, `color`, `size`, `radius`, `gradient`              |
| `Spoiler`                                                                           | Collapse long content  | `maxHeight`, `showLabel`, `hideLabel`                         |
| `Image`                                                                             | Styled image           | `src`, `fit`, `radius`, `fallbackSrc`                         |
| `BackgroundImage`                                                                   | Image as bg            | `src`, `radius`                                               |
| `Kbd`                                                                               | Keyboard key           | `size`                                                        |
| `ColorSwatch`                                                                       | Color circle           | `color`, `size`, `radius`                                     |
| `NumberFormatter`                                                                   | Format a number        | `value`, `prefix`, `thousandSeparator`, `decimalScale`        |

### Typography

| Component    | Use                    | Key props                                                                 |
| ------------ | ---------------------- | ------------------------------------------------------------------------- |
| `Text`       | Body text              | `size`, `fw`, `c`, `truncate`, `lineClamp`, `span`, `inherit`, `gradient` |
| `Title`      | Headings h1–h6         | `order` (1–6), `size`, `c`                                                |
| `Anchor`     | Styled link            | `href`, `underline`, `c`                                                  |
| `Highlight`  | Highlight substrings   | `highlight`, `color`                                                      |
| `Mark`       | Highlighted text       | `color`                                                                   |
| `Code`       | Inline/block code      | `block`, `color`                                                          |
| `Blockquote` | Quote block            | `cite`, `icon`, `color`                                                   |
| `Typography` | Style raw HTML content | wraps children                                                            |

### Overlays & popups

| Component                                                                                 | Use                         | Key props                                                                         |
| ----------------------------------------------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| `Modal` (+ `.Root`, `.Overlay`, `.Content`, `.Header`, `.Title`, `.Body`, `.CloseButton`) | Dialog                      | `opened`, `onClose`, `title`, `size`, `centered`, `fullScreen`, `withCloseButton` |
| `Drawer` (+ same compound parts)                                                          | Slide-in panel              | `opened`, `onClose`, `position`, `size`                                           |
| `Popover` (+ `.Target`, `.Dropdown`)                                                      | Floating panel              | `opened`, `position`, `withArrow`, `trapFocus`, `width`                           |
| `Tooltip` (+ `.Group`, `.Floating`)                                                       | Hover hint                  | `label`, `position`, `withArrow`, `multiline`, `events`                           |
| `HoverCard` (+ `.Target`, `.Dropdown`)                                                    | Rich hover panel            | `width`, `position`, `openDelay`                                                  |
| `Menu` (+ `.Target`, `.Dropdown`, `.Item`, `.Label`, `.Divider`, `.Sub`)                  | Dropdown menu               | `opened`, `position`, `trigger`, `withArrow`, `closeOnItemClick`                  |
| `Tabs` (+ `.List`, `.Tab`, `.Panel`)                                                      | Tabbed views                | `value`, `defaultValue`, `orientation`, `variant`, `keepMounted`                  |
| `Overlay`                                                                                 | Dim background              | `color`, `backgroundOpacity`, `blur`, `gradient`                                  |
| `LoadingOverlay`                                                                          | Block content while loading | `visible`, `loaderProps`, `overlayProps`                                          |
| `Affix`                                                                                   | Fixed-position child        | `position`, `zIndex`                                                              |
| `Portal` / `OptionalPortal`                                                               | Render into portal          | `target`                                                                          |
| `FloatingIndicator`                                                                       | Animated active indicator   | `target`, `parent`                                                                |

### Navigation

| Component                           | Use                    | Key props                                                  |
| ----------------------------------- | ---------------------- | ---------------------------------------------------------- |
| `Anchor`                            | Link                   | `href`, `underline`                                        |
| `Breadcrumbs`                       | Breadcrumb trail       | `separator`, `separatorMargin`                             |
| `Burger`                            | Hamburger toggle       | `opened`, `onClick`, `size`                                |
| `NavLink`                           | Sidebar nav item       | `label`, `leftSection`, `active`, `childrenOffset`, `href` |
| `Pagination` (+ parts)              | Page navigation        | `total`, `value`, `onChange`, `siblings`, `boundaries`     |
| `Stepper` (+ `.Step`, `.Completed`) | Multi-step flow        | `active`, `onStepClick`, `orientation`                     |
| `Tabs`                              | (see overlays)         |                                                            |
| `TableOfContents`                   | Auto TOC from headings | `scrollSpyOptions`, `getControlProps`                      |
| `Tree`                              | Hierarchical tree      | `data`, `renderNode`                                       |

### Feedback

| Component                                    | Use                 | Key props                                                         |
| -------------------------------------------- | ------------------- | ----------------------------------------------------------------- |
| `Alert`                                      | Static message      | `title`, `color`, `variant`, `icon`, `withCloseButton`, `onClose` |
| `Notification`                               | Toast-style box     | `title`, `color`, `loading`, `withCloseButton`, `icon`            |
| `Loader`                                     | Spinner             | `type` (`oval`/`bars`/`dots`), `size`, `color`                    |
| `Progress` (+ `.Root`, `.Section`, `.Label`) | Progress bar        | `value`, `color`, `size`, `striped`, `animated`                   |
| `RingProgress`                               | Circular progress   | `sections`, `size`, `thickness`, `label`                          |
| `SemiCircleProgress`                         | Gauge               | `value`, `size`, `thickness`, `fillDirection`                     |
| `Skeleton`                                   | Loading placeholder | `height`, `width`, `circle`, `radius`, `visible`                  |

### Misc / utilities

| Component                           | Use                                                                |
| ----------------------------------- | ------------------------------------------------------------------ |
| `MALUIProvider` / `MantineProvider` | Theme provider (see setup.md)                                      |
| `ColorSchemeScript`                 | Inline script to set color scheme before paint                     |
| `DirectionProvider`                 | RTL/LTR direction context                                          |
| `VisuallyHidden`                    | Screen-reader-only content                                         |
| `FocusTrap`                         | Trap focus within children                                         |
| `Transition`                        | Mount/unmount animations (`transition`, `duration`, `mounted`)     |
| `Collapse`                          | Animated height collapse (`in`)                                    |
| `Divider`                           | Horizontal/vertical rule (`orientation`, `label`, `labelPosition`) |
| `Grid`, `Flex` etc.                 | (layout, above)                                                    |
| `Pill` (+ `.Group`)                 | Removable token                                                    |
| `Notification`                      | (feedback, above)                                                  |

### Helper functions / utilities (exported from `mal-ui/core`)

`createTheme`, `mergeMALUITheme` / `mergeMantineTheme`, `virtualColor`,
`parseThemeColor`, `defaultVariantColorsResolver`, `colorsTuple`, `darken`,
`lighten`, `rgba`, `alpha`, `getThemeColor`, `rem`, `em`, `px`,
`useMALUITheme` / `useMantineTheme`, `useMALUIColorScheme` / `useMantineColorScheme`,
`useProps`, `useResolvedStylesApi`.

---

## Usage examples

```tsx
import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Badge,
} from "mal-ui/core";

function ProfileCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Text fw={600}>Account</Text>
        <Badge color="mal-success">Active</Badge>
      </Group>
      <Stack gap="sm" mt="md">
        <TextInput label="Name" placeholder="Your name" />
        <TextInput label="Email" placeholder="you@mal.dev" />
        <Button color="mal-brand" fullWidth>
          Save
        </Button>
      </Stack>
    </Card>
  );
}
```

Controlled modal with the `useDisclosure` hook:

```tsx
import { Modal, Button } from "mal-ui/core";
import { useDisclosure } from "mal-ui/hooks";

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button onClick={open}>Open</Button>
      <Modal opened={opened} onClose={close} title="Details" centered>
        Content
      </Modal>
    </>
  );
}
```
