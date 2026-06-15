# mal-ui Component API Reference

Deep, per-component reference for the most-used `mal-ui/core` components: exact
prop tables, `variant` values, **Styles API selectors** (for `classNames` /
`styles`), and **CSS variables** (for `vars` / theme overrides).

The public API is **identical to Mantine v9** — only the import path changes
(`mal-ui/core`, never `@mantine/core`). For a high-level catalog of every
component, see [core.md](./core.md). For full demos of any single component,
search the bundled `llm.md` (repo root) for `### <ComponentName>`.

## How to read this file

- **Props** — most components also accept the shared style props (`m`, `p`, `w`,
  `c`, `bg`, …) and `classNames` / `styles` / `vars` from the Styles API. Only
  component-specific props are listed here.
- **Styles API selectors** — keys you pass to `classNames={{ ... }}` or
  `styles={{ ... }}` to target inner elements.
- **CSS variables** — set via the `vars` prop:
  `vars={() => ({ root: { '--button-height': '48px' } })}` or globally in the
  theme's `components` override.
- **`color`** accepts a theme color name (`"mal-brand"`, `"mal-brand.5"`,
  `"mal-secondary"`, `"red"`) or any CSS color.
- **`size`** / **`radius`** accept `"xs" | "sm" | "md" | "lg" | "xl"` or a number
  (→ rem). **`variant`** values are per-component (listed below).

---

## Button

```tsx
import { Button } from "mal-ui/core";

<Button
  variant="filled"
  color="mal-brand"
  size="md"
  radius="md"
  leftSection={<IconDownload size={16} />}
  loading={false}
  fullWidth
>
  Download
</Button>;
```

| Prop                           | Type                                                                                                  | Default               | Description                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------- |
| `variant`                      | `"filled" \| "light" \| "outline" \| "subtle" \| "transparent" \| "white" \| "default" \| "gradient"` | `"filled"`            | Visual style                                |
| `color`                        | `MantineColor`                                                                                        | theme `primaryColor`  | Control color                               |
| `gradient`                     | `{ from; to; deg? }`                                                                                  | —                     | Used when `variant="gradient"`              |
| `size`                         | `MantineSize \| "compact-xs"…"compact-xl" \| number`                                                  | `"sm"`                | Height/padding; `compact-*` reduces padding |
| `radius`                       | `MantineRadius`                                                                                       | theme `defaultRadius` | Border radius                               |
| `fullWidth`                    | `boolean`                                                                                             | `false`               | Stretch to 100% width                       |
| `leftSection` / `rightSection` | `ReactNode`                                                                                           | —                     | Icon/content beside label                   |
| `loading`                      | `boolean`                                                                                             | `false`               | Show loader, disable interactions           |
| `loaderProps`                  | `LoaderProps`                                                                                         | —                     | Props for the inner `Loader`                |
| `disabled`                     | `boolean`                                                                                             | `false`               | Disabled state                              |
| `justify`                      | `CSS justify-content`                                                                                 | `"center"`            | Inner content alignment                     |
| `component`                    | `ElementType`                                                                                         | `"button"`            | Polymorphic (`component="a"`)               |

**Styles API selectors:** `root`, `loader`, `inner`, `section`, `label`.
**CSS variables (root):** `--button-height`, `--button-padding-x`,
`--button-radius`, `--button-bg`, `--button-hover`, `--button-color`,
`--button-bd`, `--button-justify`.

`Button.Group` props: `orientation` (`"horizontal" | "vertical"`), `borderWidth`.

---

## ActionIcon

Icon-only button. Same `variant` set as `Button`, plus the requirement of an
accessible label.

| Prop                        | Type           | Notes                                              |
| --------------------------- | -------------- | -------------------------------------------------- |
| `variant`                   | same as Button | `"subtle"` and `"default"` are common for toolbars |
| `color` / `size` / `radius` | as Button      | `size` also accepts numbers (px box)               |
| `loading` / `disabled`      | `boolean`      |                                                    |
| `aria-label`                | `string`       | **Required** for accessibility (no visible text)   |

**Styles API:** `root`, `loader`, `icon`.
**CSS variables (root):** `--ai-size`, `--ai-radius`, `--ai-bg`, `--ai-hover`,
`--ai-color`, `--ai-bd`. `ActionIcon.Group` mirrors `Button.Group`.

---

## TextInput / PasswordInput / Textarea (and all `Input.Wrapper`-based inputs)

Shared base for text-like inputs. `Textarea` adds `autosize`, `minRows`,
`maxRows`, `resize`. `PasswordInput` adds `visible` / `defaultVisible` /
`onVisibilityChange` / `visibilityToggleIcon`.

| Prop                                                     | Type                                  | Description                                |
| -------------------------------------------------------- | ------------------------------------- | ------------------------------------------ |
| `label`                                                  | `ReactNode`                           | Field label                                |
| `description`                                            | `ReactNode`                           | Helper text under label                    |
| `error`                                                  | `ReactNode \| boolean`                | Error message / error state                |
| `placeholder`                                            | `string`                              | Placeholder                                |
| `required`                                               | `boolean`                             | Adds required semantics                    |
| `withAsterisk`                                           | `boolean`                             | Show asterisk without `required` semantics |
| `variant`                                                | `"default" \| "filled" \| "unstyled"` | Visual style                               |
| `size`                                                   | `MantineSize`                         | Control size                               |
| `radius`                                                 | `MantineRadius`                       | Border radius                              |
| `leftSection` / `rightSection`                           | `ReactNode`                           | Inner adornments                           |
| `leftSectionWidth` / `rightSectionWidth`                 | `number \| string`                    | Section width                              |
| `leftSectionPointerEvents` / `rightSectionPointerEvents` | CSS                                   | Enable clicks on section                   |
| `disabled`                                               | `boolean`                             | Disabled                                   |
| `value` / `defaultValue`                                 | `string`                              | Controlled / uncontrolled                  |
| `onChange`                                               | `(e) => void`                         | Change handler                             |
| `pointer`                                                | `boolean`                             | Cursor pointer (for select-like usage)     |

**Styles API selectors:** `wrapper`, `input`, `section`, `root`, `label`,
`required`, `description`, `error`.
**CSS variables (wrapper):** `--input-height`, `--input-radius`,
`--input-left-section-width`, `--input-right-section-width`,
`--input-left-section-pointer-events`, `--input-right-section-pointer-events`,
`--input-padding-y`, `--input-margin-bottom`, `--input-fz`, `--input-size`.

> Use these same selectors for `Select`, `MultiSelect`, `Autocomplete`,
> `TagsInput`, `NumberInput`, `PinInput`, `JsonInput`, `ColorInput`, and the
> date inputs — they all build on `Input` / `Input.Wrapper`.

---

## Select / MultiSelect / Autocomplete / TagsInput

Dropdown inputs built on `Combobox` + the input base above.

| Prop                                  | Type                                                            | Description                        |
| ------------------------------------- | --------------------------------------------------------------- | ---------------------------------- |
| `data`                                | `(string \| { value; label; disabled? } \| { group; items })[]` | Options (supports groups)          |
| `value` / `defaultValue`              | `string \| null` (`string[]` for Multi/Tags)                    | Selection                          |
| `onChange`                            | `(value) => void`                                               | Selection change                   |
| `searchable`                          | `boolean`                                                       | Enable filtering                   |
| `searchValue` / `onSearchChange`      | `string` / fn                                                   | Controlled search                  |
| `clearable`                           | `boolean`                                                       | Show clear button                  |
| `nothingFoundMessage`                 | `ReactNode`                                                     | Empty-state text                   |
| `maxDropdownHeight`                   | `number`                                                        | Scroll threshold                   |
| `withCheckIcon` / `checkIconPosition` | `boolean` / `"left" \| "right"`                                 | Selected check mark                |
| `comboboxProps`                       | `ComboboxProps`                                                 | Position, width, dropdown behavior |
| `renderOption`                        | `(item) => ReactNode`                                           | Custom option renderer             |
| `limit`                               | `number`                                                        | Max options shown                  |
| `maxValues` (Multi/Tags)              | `number`                                                        | Max selections                     |

**Styles API:** `dropdown`, `options`, `option`, `group`, `groupLabel`,
`empty`, plus all input selectors. **MultiSelect/TagsInput** add `pill`,
`pillsList`, `inputField`.

---

## NumberInput

| Prop                                 | Type                           | Description              |
| ------------------------------------ | ------------------------------ | ------------------------ |
| `value` / `defaultValue`             | `number \| string`             | Value                    |
| `min` / `max` / `step`               | `number`                       | Bounds and increment     |
| `clampBehavior`                      | `"strict" \| "blur" \| "none"` | When to clamp to min/max |
| `allownegative` / `allowDecimal`     | `boolean`                      | Input constraints        |
| `decimalScale`                       | `number`                       | Fixed decimals           |
| `fixedDecimalScale`                  | `boolean`                      | Always show decimals     |
| `thousandSeparator`                  | `string \| boolean`            | Group digits             |
| `prefix` / `suffix`                  | `string`                       | Adornment text           |
| `hideControls`                       | `boolean`                      | Hide stepper buttons     |
| `stepHoldDelay` / `stepHoldInterval` | `number`                       | Press-and-hold stepping  |

**Styles API:** `controls`, `control`, plus all input selectors.

---

## Checkbox / Radio / Switch / Chip

Boolean / choice controls. All accept `checked` / `defaultChecked` / `onChange`,
`label`, `description`, `error`, `color`, `size`, `radius`, `disabled`.

| Component  | Extra props                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `Checkbox` | `indeterminate`, `icon`, `iconColor`, `labelPosition`                     |
| `Radio`    | `value`, `icon`, `iconColor`, `labelPosition`                             |
| `Switch`   | `onLabel`, `offLabel`, `thumbIcon`, `labelPosition`, `withThumbIndicator` |
| `Chip`     | `value`, `variant` (`"outline" \| "light" \| "filled"`), `icon`           |

Group variants (`Checkbox.Group`, `Radio.Group`, `Switch.Group`, `Chip.Group`)
take `value`, `defaultValue`, `onChange`, and share `label` / `error`.

**Styles API (Checkbox):** `root`, `body`, `inner`, `input`, `icon`, `labelWrapper`,
`label`, `description`, `error`. **Switch:** `root`, `track`, `thumb`, `trackLabel`,
`labelWrapper`, `label`, `input`. **CSS variables (Checkbox):** `--checkbox-size`,
`--checkbox-radius`, `--checkbox-color`, `--checkbox-icon-color`.

---

## Card / Paper

| Prop         | Type             | Description                     |
| ------------ | ---------------- | ------------------------------- |
| `shadow`     | `MantineShadow`  | `"xs"…"xl"` elevation           |
| `padding`    | `MantineSpacing` | Inner padding (Card)            |
| `radius`     | `MantineRadius`  | Corner radius                   |
| `withBorder` | `boolean`        | 1px border                      |
| `p` (Paper)  | `MantineSpacing` | Padding (Paper uses style prop) |

`Card.Section` props: `withBorder`, `inheritPadding`. **Styles API (Card):**
`root`, `section`. **CSS variables:** `--card-padding`, `--paper-radius`,
`--paper-shadow`.

---

## Badge / Avatar / ThemeIcon

| Component   | Key props                                                                                                                                                                                      |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`     | `variant` (`"filled" \| "light" \| "outline" \| "dot" \| "transparent" \| "white" \| "gradient"`), `color`, `size`, `radius`, `leftSection`, `rightSection`, `circle`, `fullWidth`, `gradient` |
| `Avatar`    | `src`, `alt`, `name` (auto-initials), `color` (`"initials"` for hashed), `radius`, `size`, `variant`                                                                                           |
| `ThemeIcon` | `variant`, `color`, `size`, `radius`, `gradient`                                                                                                                                               |

**Styles API (Badge):** `root`, `label`, `section`.
**CSS vars (Badge):** `--badge-height`, `--badge-radius`, `--badge-bg`,
`--badge-color`, `--badge-bd`, `--badge-fz`, `--badge-padding-x`.
`Avatar.Group` props: `spacing`.

---

## Modal / Drawer

| Prop                                    | Type                                        | Description                          |
| --------------------------------------- | ------------------------------------------- | ------------------------------------ |
| `opened`                                | `boolean`                                   | Open state (**required**)            |
| `onClose`                               | `() => void`                                | Close handler (**required**)         |
| `title`                                 | `ReactNode`                                 | Header title                         |
| `size`                                  | `MantineSize \| number \| "auto" \| "100%"` | Width (Modal) / size (Drawer)        |
| `centered` (Modal)                      | `boolean`                                   | Vertically center                    |
| `fullScreen` (Modal)                    | `boolean`                                   | Fill viewport                        |
| `position` (Drawer)                     | `"left" \| "right" \| "top" \| "bottom"`    | Slide-in side                        |
| `withCloseButton`                       | `boolean`                                   | Show X                               |
| `closeOnClickOutside` / `closeOnEscape` | `boolean`                                   | Dismiss behavior                     |
| `withOverlay`                           | `boolean`                                   | Backdrop                             |
| `overlayProps`                          | `OverlayProps`                              | `backgroundOpacity`, `blur`, `color` |
| `transitionProps`                       | `TransitionProps`                           | `transition`, `duration`             |
| `trapFocus` / `returnFocus`             | `boolean`                                   | Focus management                     |
| `keepMounted`                           | `boolean`                                   | Keep in DOM when closed              |
| `radius` / `padding`                    | tokens                                      | Content styling                      |
| `zIndex`                                | `number`                                    | Stacking                             |
| `scrollAreaComponent`                   | `Component`                                 | Custom scroll wrapper                |

**Styles API:** `root`, `inner`, `content`, `header`, `title`, `body`, `close`,
`overlay`. Compound form available: `Modal.Root`, `.Overlay`, `.Content`,
`.Header`, `.Title`, `.Body`, `.CloseButton` (same for `Drawer.*`).

---

## Popover / HoverCard / Menu / Tooltip

Floating UI components sharing positioning props.

**Common positioning props:** `position` (`"bottom" | "top" | "left" | "right"`
with `-start` / `-end` modifiers), `offset`, `withArrow`, `arrowSize`,
`arrowPosition`, `middlewares`, `withinPortal`, `zIndex`, `width`,
`shadow`, `radius`, `transitionProps`.

| Component   | Specific props                                                                                                 |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| `Popover`   | `opened`, `onChange`, `trapFocus`, `closeOnClickOutside`, `closeOnEscape`, `clickOutsideEvents`, `keepMounted` |
| `HoverCard` | `openDelay`, `closeDelay`, `width`                                                                             |
| `Menu`      | `opened`, `onChange`, `trigger` (`"click"                                                                      | "hover" | "click-hover"`), `closeOnItemClick`, `loop`, `closeOnClickOutside` |
| `Tooltip`   | `label` (**required**), `multiline`, `events`, `opened`, `color`, `openDelay`, `closeDelay`, `refProp`         |

**Compound parts:** `Popover.Target` / `.Dropdown`; `HoverCard.Target` /
`.Dropdown`; `Menu.Target` / `.Dropdown` / `.Item` / `.Label` / `.Divider` /
`.Sub`. **Menu.Item props:** `leftSection`, `rightSection`, `color`, `disabled`,
`closeMenuOnClick`. **Styles API (Menu):** `dropdown`, `item`, `itemLabel`,
`itemSection`, `label`, `divider`, `arrow`.

---

## Tabs

```tsx
<Tabs defaultValue="overview" variant="default" radius="md">
  <Tabs.List>
    <Tabs.Tab value="overview" leftSection={<IconHome size={14} />}>
      Overview
    </Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">…</Tabs.Panel>
  <Tabs.Panel value="settings">…</Tabs.Panel>
</Tabs>
```

| Prop (on `Tabs`)                                   | Type                                | Description                  |
| -------------------------------------------------- | ----------------------------------- | ---------------------------- |
| `value` / `defaultValue`                           | `string \| null`                    | Active tab                   |
| `onChange`                                         | `(value) => void`                   | Change handler               |
| `variant`                                          | `"default" \| "outline" \| "pills"` | Style                        |
| `orientation`                                      | `"horizontal" \| "vertical"`        | Direction                    |
| `placement` (vertical)                             | `"left" \| "right"`                 | List side                    |
| `color` / `radius`                                 | tokens                              | Accent / corners             |
| `keepMounted`                                      | `boolean`                           | Keep inactive panels mounted |
| `activateTabWithKeyboard` / `allowTabDeactivation` | `boolean`                           | Behavior                     |

`Tabs.Tab` props: `value` (**required**), `leftSection`, `rightSection`,
`color`, `disabled`. **Styles API:** `root`, `list`, `tab`, `tabLabel`,
`tabSection`, `panel`.

---

## Accordion

| Prop                     | Type                                                  | Description             |
| ------------------------ | ----------------------------------------------------- | ----------------------- |
| `multiple`               | `boolean`                                             | Allow many open         |
| `value` / `defaultValue` | `string \| string[] \| null`                          | Open item(s)            |
| `onChange`               | fn                                                    | Change handler          |
| `variant`                | `"default" \| "contained" \| "filled" \| "separated"` | Style                   |
| `chevronPosition`        | `"left" \| "right"`                                   | Chevron side            |
| `chevron`                | `ReactNode`                                           | Custom chevron          |
| `disableChevronRotation` | `boolean`                                             | Static chevron          |
| `radius` / `order`       | tokens / `2–6`                                        | Corners / heading level |

Parts: `Accordion.Item` (`value`), `.Control` (`icon`, `disabled`,
`chevron`), `.Panel`. **Styles API:** `root`, `item`, `control`, `chevron`,
`label`, `itemTitle`, `panel`, `content`, `icon`.

---

## Notification / Alert

| Component      | Key props                                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Notification` | `title`, `color`, `icon`, `loading`, `withCloseButton`, `withBorder`, `radius`, `onClose`                                                                 |
| `Alert`        | `title`, `color`, `variant` (`"light" \| "filled" \| "outline" \| "transparent" \| "white" \| "default"`), `icon`, `withCloseButton`, `onClose`, `radius` |

**Styles API (Alert):** `root`, `wrapper`, `body`, `title`, `label`, `message`,
`icon`, `closeButton`. (For the toast system use [notifications.md](./notifications.md).)

---

## Progress / Loader / Skeleton / RingProgress

| Component                    | Key props                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `Progress`                   | `value` (0–100), `color`, `size`, `radius`, `striped`, `animated`, `transitionDuration`          |
| `Progress.Root` + `.Section` | Compound for multi-segment bars (`value`, `color`, `striped`)                                    |
| `Loader`                     | `type` (`"oval" \| "bars" \| "dots"`), `size`, `color`, `children`                               |
| `Skeleton`                   | `height`, `width`, `circle`, `radius`, `visible`, `animate`                                      |
| `RingProgress`               | `sections: { value; color; tooltip? }[]`, `size`, `thickness`, `roundCaps`, `label`, `rootColor` |

**CSS vars (Progress):** `--progress-radius`, `--progress-size`.
The `Loader` type and the brand spinner are configured in `malTheme`.

---

## Slider / RangeSlider / Rating

| Component     | Key props                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Slider`      | `value`/`defaultValue: number`, `min`, `max`, `step`, `marks`, `label`, `labelAlwaysOn`, `color`, `size`, `radius`, `thumbSize`, `inverted`, `restrictToMarks` |
| `RangeSlider` | same with `value: [number, number]`, `minRange`, `pushOnOverlap`                                                                                               |
| `Rating`      | `value`/`defaultValue`, `count`, `fractions`, `color`, `size`, `readOnly`, `emptySymbol`, `fullSymbol`                                                         |

**Styles API (Slider):** `root`, `track`, `bar`, `thumb`, `mark`, `markWrapper`,
`markLabel`, `label`. **CSS vars:** `--slider-size`, `--slider-radius`,
`--slider-color`, `--slider-thumb-size`.

---

## Group / Stack / Flex / SimpleGrid / Grid

| Component    | Key props                                                                               |
| ------------ | --------------------------------------------------------------------------------------- |
| `Group`      | `justify`, `align`, `gap`, `wrap` (`"wrap" \| "nowrap"`), `grow`, `preventGrowOverflow` |
| `Stack`      | `justify`, `align`, `gap`                                                               |
| `Flex`       | `direction`, `wrap`, `justify`, `align`, `gap`, `rowGap`, `columnGap` (all responsive)  |
| `SimpleGrid` | `cols`, `spacing`, `verticalSpacing` (all responsive objects)                           |
| `Grid`       | `gutter`, `columns` (default 12), `grow`, `justify`, `align`, `overflow`                |
| `Grid.Col`   | `span` (`number \| "auto" \| "content"` or responsive), `offset`, `order`               |

Responsive values use a breakpoint object: `cols={{ base: 1, sm: 2, lg: 4 }}`.
**CSS vars (Grid):** `--grid-gutter`, `--col-flex-basis`, `--col-span`.

---

## Styles API quick recipe

```tsx
import { TextInput } from "mal-ui/core";

// Per-instance overrides
<TextInput
  label="Email"
  classNames={{ input: "my-input", label: "my-label" }}
  styles={{ input: { borderColor: "var(--mantine-color-mal-brand-5)" } }}
  vars={() => ({ wrapper: { "--input-height": "44px" } })}
/>;
```

Global override in the theme (applies to every instance):

```tsx
import { createTheme, Button } from "mal-ui/core";

const overrides = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: { radius: "md" },
      styles: { root: { fontWeight: 600 } },
    }),
  },
});
```

> `malTheme` already ships branded defaults for `Button`, `TextInput`, `Select`,
> `Card`, and `Modal`. Merge your overrides on top with `mergeMALUITheme` rather
> than replacing the theme. See [theme.md](./theme.md).
