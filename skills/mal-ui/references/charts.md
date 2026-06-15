# mal-ui Charts Reference (`mal-ui/charts`)

Re-exports **all of `@mantine/charts` (v9)**. Charts are built on **recharts**.

**Peer dependency:** `npm i recharts` (>=2.15).
**CSS:** covered by `mal-ui/styles.css` (already imported at root).

```tsx
import { LineChart, BarChart, DonutChart } from "mal-ui/charts";
```

---

## Components

| Component                        | Use                                            |
| -------------------------------- | ---------------------------------------------- |
| `LineChart`                      | Trends over a continuous axis                  |
| `AreaChart`                      | Line chart with filled area; supports stacking |
| `BarChart`                       | Categorical comparison; grouped/stacked        |
| `CompositeChart`                 | Mix line/area/bar series on one chart          |
| `DonutChart`                     | Proportions with a center hole                 |
| `PieChart`                       | Proportions, full circle                       |
| `RadarChart`                     | Multivariate comparison                        |
| `ScatterChart`                   | Correlation between two variables              |
| `BubbleChart`                    | Three-dimensional scatter (x, y, size)         |
| `Sparkline`                      | Tiny inline trend line                         |
| `RadialBarChart`                 | Circular bar chart                             |
| `FunnelChart`                    | Stage/conversion funnel                        |
| `Heatmap`                        | Calendar/grid intensity map                    |
| `ChartTooltip` / `ChartLegend`   | Reusable tooltip/legend building blocks        |
| `getFilteredChartTooltipPayload` | Helper for custom tooltips                     |

---

## Common props (cartesian charts: Line/Area/Bar/Composite)

| Prop                        | Type                                                           | Description                                                      |
| --------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `data`                      | `Record<string, any>[]`                                        | **Required.** Array of data points.                              |
| `dataKey`                   | `string`                                                       | **Required.** Key for the x-axis category.                       |
| `series`                    | `{ name: string; color: MantineColor; label?: string }[]`      | **Required.** Series to plot. `color` accepts `mal-brand.5` etc. |
| `h` / `w`                   | `number \| string`                                             | Height/width (height required).                                  |
| `type`                      | `"default" \| "stacked" \| "percent" \| "split"` (Area/Bar)    | Stacking mode.                                                   |
| `orientation`               | `"horizontal" \| "vertical"`                                   | Bar orientation.                                                 |
| `curveType`                 | `"bump" \| "linear" \| "natural" \| "monotone" \| "step" \| …` | Line/area curve.                                                 |
| `withLegend`                | `boolean`                                                      | Show legend.                                                     |
| `legendProps`               | `object`                                                       | Recharts legend props (e.g. `{ verticalAlign: 'bottom' }`).      |
| `withTooltip`               | `boolean`                                                      | Show tooltip (default true).                                     |
| `tooltipAnimationDuration`  | `number`                                                       | Tooltip animation.                                               |
| `withXAxis` / `withYAxis`   | `boolean`                                                      | Toggle axes.                                                     |
| `xAxisProps` / `yAxisProps` | `object`                                                       | Recharts axis props.                                             |
| `gridAxis`                  | `"x" \| "y" \| "xy" \| "none"`                                 | Grid lines.                                                      |
| `tickLine`                  | `"x" \| "y" \| "xy" \| "none"`                                 | Tick lines.                                                      |
| `withDots`                  | `boolean`                                                      | Dots on data points (line/area).                                 |
| `connectNulls`              | `boolean`                                                      | Bridge null gaps.                                                |
| `unit`                      | `string`                                                       | Axis/tooltip unit suffix.                                        |
| `valueFormatter`            | `(value: number) => string`                                    | Format values.                                                   |
| `referenceLines`            | `{ y?, x?, label?, color? }[]`                                 | Reference lines.                                                 |
| `strokeDasharray`           | `string \| number`                                             | Grid dash.                                                       |
| `fillOpacity`               | `number`                                                       | Area fill opacity.                                               |

## DonutChart / PieChart props

| Prop                      | Type                                                     | Description             |
| ------------------------- | -------------------------------------------------------- | ----------------------- |
| `data`                    | `{ name: string; value: number; color: MantineColor }[]` | **Required.** Segments. |
| `withLabels`              | `boolean`                                                | Show segment labels.    |
| `withLabelsLine`          | `boolean`                                                | Lines to labels.        |
| `withTooltip`             | `boolean`                                                | Tooltip toggle.         |
| `chartLabel`              | `string \| number`                                       | Center label (Donut).   |
| `size`                    | `number`                                                 | Chart diameter.         |
| `thickness`               | `number`                                                 | Ring thickness (Donut). |
| `paddingAngle`            | `number`                                                 | Gap between segments.   |
| `startAngle` / `endAngle` | `number`                                                 | Arc range.              |
| `strokeWidth`             | `number`                                                 | Segment border.         |
| `tooltipDataSource`       | `"segment" \| "all"`                                     | Tooltip content.        |

---

## Examples

```tsx
import { LineChart } from "mal-ui/charts";

const data = [
  { date: "Mar", Revenue: 2890, Expenses: 2400 },
  { date: "Apr", Revenue: 2756, Expenses: 1398 },
  { date: "May", Revenue: 3322, Expenses: 2800 },
];

<LineChart
  h={300}
  data={data}
  dataKey="date"
  series={[
    { name: "Revenue", color: "mal-brand.6" },
    { name: "Expenses", color: "mal-secondary.6" },
  ]}
  curveType="monotone"
  withLegend
/>;
```

```tsx
import { DonutChart } from "mal-ui/charts";

<DonutChart
  data={[
    { name: "USA", value: 400, color: "mal-brand.6" },
    { name: "EU", value: 300, color: "mal-success.6" },
    { name: "Asia", value: 200, color: "mal-warning.6" },
  ]}
  chartLabel="Sales"
  withLabels
/>;
```

```tsx
import { BarChart } from "mal-ui/charts";

<BarChart
  h={300}
  data={data}
  dataKey="date"
  type="stacked"
  series={[
    { name: "Revenue", color: "mal-brand.6" },
    { name: "Expenses", color: "mal-error.6" },
  ]}
/>;
```

> For exhaustive prop tables and every chart variant, search `llm.md` for
> `### LineChart`, `### BarChart`, etc.
