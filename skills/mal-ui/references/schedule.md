# mal-ui Schedule Reference (`mal-ui/schedule`)

Re-exports **all of `@mantine/schedule` (v9)** — week/day schedule and calendar
views for events and time slots.

**Peer dependency:** `npm i dayjs` (>=1.11).
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { Schedule } from "mal-ui/schedule";
```

> `@mantine/schedule` is a newer package; component and prop names may evolve.
> Treat the table below as a starting point and verify against the bundled
> `llm.md` (search for `### Schedule`) and IDE type hints from `mal-ui/schedule`.

---

## Typical exports

| Export                             | Use                                        |
| ---------------------------------- | ------------------------------------------ |
| `Schedule`                         | Root schedule/calendar view (week or day). |
| `Schedule.Event` / event renderers | Render individual events.                  |
| schedule helpers/types             | Time-slot and event data types.            |

## Common props

| Prop                  | Type                   | Description                                             |
| --------------------- | ---------------------- | ------------------------------------------------------- |
| `data` / `events`     | `ScheduleEvent[]`      | Events to render (`{ id, start, end, title, color? }`). |
| `view`                | `"week" \| "day"`      | Display mode.                                           |
| `date`                | `Date`                 | Currently displayed date/week.                          |
| `onDateChange`        | `(date) => void`       | Navigate weeks/days.                                    |
| `firstDayOfWeek`      | `0–6`                  | Week start.                                             |
| `minTime` / `maxTime` | `string`               | Visible time bounds (`"08:00"`).                        |
| `slotDuration`        | `number \| string`     | Slot granularity.                                       |
| `onEventClick`        | `(event) => void`      | Event interaction.                                      |
| `renderEvent`         | `(event) => ReactNode` | Custom event rendering.                                 |
| `color`               | `MantineColor`         | Accent (use `mal-brand`).                               |

---

## Example

```tsx
import { Schedule } from "mal-ui/schedule";

const events = [
  {
    id: "1",
    title: "Standup",
    start: "2026-06-01T09:00",
    end: "2026-06-01T09:30",
    color: "mal-brand",
  },
  {
    id: "2",
    title: "Design review",
    start: "2026-06-01T14:00",
    end: "2026-06-01T15:00",
    color: "mal-secondary",
  },
];

<Schedule view="week" events={events} onEventClick={(e) => console.log(e)} />;
```

> Because the API surface of `@mantine/schedule` is still stabilizing, always
> confirm exact prop names with TypeScript autocompletion on `mal-ui/schedule`
> and the bundled `llm.md`.
