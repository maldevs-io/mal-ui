# mal-ui Dates Reference (`mal-ui/dates`)

Re-exports **all of `@mantine/dates` (v9)**: date/time pickers, calendars, and the
`DatesProvider`.

**Peer dependency:** `npm i dayjs` (>=1.11).
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { DatePickerInput, DateTimePicker, Calendar } from "mal-ui/dates";
```

---

## Provider (optional)

Wrap the app (inside `MALUIProvider`) to set locale and date defaults globally.

```tsx
import { DatesProvider } from "mal-ui/dates";

<DatesProvider
  settings={{
    locale: "en",
    firstDayOfWeek: 1,
    weekendDays: [0, 6],
    timezone: "UTC",
  }}
>
  {children}
</DatesProvider>;
```

`settings`: `{ locale?, firstDayOfWeek? (0–6), weekendDays?, timezone?, consistentWeeks? }`.

---

## Components

| Component                          | Use                                    | Value type                        |
| ---------------------------------- | -------------------------------------- | --------------------------------- |
| `DateInput`                        | Free-typed single date in a text input | `Date \| null`                    |
| `DatePicker`                       | Inline calendar (no input)             | `Date \| null` / range / multiple |
| `DatePickerInput`                  | Calendar in a dropdown input           | depends on `type`                 |
| `DateTimePicker`                   | Date + time selection                  | `Date \| null`                    |
| `TimePicker`                       | Time selection w/ dropdown             | `string` (`"HH:mm:ss"`)           |
| `TimeInput`                        | Native time input                      | `string`                          |
| `TimeGrid`                         | Grid of selectable time slots          | `string`                          |
| `MonthPickerInput` / `MonthPicker` | Pick a month                           | `Date \| null`                    |
| `YearPickerInput` / `YearPicker`   | Pick a year                            | `Date \| null`                    |
| `Calendar`                         | Low-level customizable calendar        | controlled level state            |
| `MiniCalendar`                     | Compact horizontal calendar            | `Date \| null`                    |
| `DateTimePicker`                   | combined                               | `Date`                            |

---

## Common props (pickers)

| Prop                                              | Type                                    | Description                                              |
| ------------------------------------------------- | --------------------------------------- | -------------------------------------------------------- |
| `value` / `defaultValue`                          | `Date \| null \| [Date,Date] \| Date[]` | Controlled/uncontrolled value (shape depends on `type`). |
| `onChange`                                        | `(value) => void`                       | Change handler.                                          |
| `type`                                            | `"default" \| "range" \| "multiple"`    | Selection mode (`DatePicker`, `DatePickerInput`).        |
| `label` / `description` / `error` / `placeholder` | `ReactNode` / `string`                  | Standard input props.                                    |
| `valueFormat`                                     | `string`                                | dayjs format string, e.g. `"DD MMM YYYY"`.               |
| `minDate` / `maxDate`                             | `Date`                                  | Allowed range bounds.                                    |
| `excludeDate`                                     | `(date) => boolean`                     | Disable specific dates.                                  |
| `clearable`                                       | `boolean`                               | Show clear button.                                       |
| `firstDayOfWeek`                                  | `0–6`                                   | Week start.                                              |
| `numberOfColumns`                                 | `number`                                | Months shown side by side.                               |
| `allowSingleDateInRange`                          | `boolean`                               | Allow same start/end in range.                           |
| `withCellSpacing`                                 | `boolean`                               | Spacing between day cells.                               |
| `renderDay`                                       | `(date) => ReactNode`                   | Custom day rendering.                                    |
| `size` / `radius` / `variant`                     | input tokens                            | Styling.                                                 |
| `popoverProps`                                    | `PopoverProps`                          | Dropdown behavior (input pickers).                       |
| `withSeconds`                                     | `boolean`                               | Time pickers include seconds.                            |
| `format`                                          | `"12h" \| "24h"`                        | Time format (`TimePicker`).                              |

---

## Examples

```tsx
import { DatePickerInput, DateTimePicker, TimeInput } from "mal-ui/dates";
import { useState } from "react";

function Demo() {
  const [date, setDate] = useState<Date | null>(null);
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <>
      <DatePickerInput
        label="Pick a date"
        placeholder="Pick date"
        value={date}
        onChange={setDate}
        valueFormat="DD MMM YYYY"
        clearable
      />
      <DatePickerInput
        type="range"
        label="Stay"
        value={range}
        onChange={setRange}
      />
      <DateTimePicker label="Appointment" withSeconds />
      <TimeInput label="Start time" />
    </>
  );
}
```

> Note: picker `value` is a `Date` object (or string in some time inputs).
> For exact value shapes per `type`, search `llm.md` for `### DatePicker`,
> `### DateTimePicker`, etc.
