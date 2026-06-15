# mal-ui Carousel Reference (`mal-ui/carousel`)

Re-exports **all of `@mantine/carousel` (v9)** — a slider/carousel built on
**Embla Carousel**.

**Peer dependency:** `npm i embla-carousel-react` (>=8.5).
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { Carousel } from "mal-ui/carousel";
```

---

## Components

| Export           | Use                           |
| ---------------- | ----------------------------- |
| `Carousel`       | Carousel root.                |
| `Carousel.Slide` | Single slide; wrap each item. |

## `Carousel` props

| Prop                                      | Type                               | Description                                     |
| ----------------------------------------- | ---------------------------------- | ----------------------------------------------- |
| `slideSize`                               | `string \| number \| object`       | Slide width, e.g. `"50%"` or responsive object. |
| `slideGap`                                | `MantineSpacing`                   | Gap between slides.                             |
| `orientation`                             | `"horizontal" \| "vertical"`       | Scroll direction.                               |
| `height`                                  | `number \| string`                 | Required for vertical orientation.              |
| `align`                                   | `"start" \| "center" \| "end"`     | Slide alignment.                                |
| `slidesToScroll`                          | `number \| "auto"`                 | Slides advanced per action.                     |
| `withControls`                            | `boolean`                          | Show prev/next arrows.                          |
| `controlsOffset`                          | `MantineSpacing`                   | Arrow inset.                                    |
| `controlSize`                             | `number`                           | Arrow button size.                              |
| `withIndicators`                          | `boolean`                          | Show dot indicators.                            |
| `loop`                                    | `boolean`                          | Infinite loop.                                  |
| `dragFree`                                | `boolean`                          | Momentum free-drag.                             |
| `draggable`                               | `boolean`                          | Enable drag (default true).                     |
| `containScroll`                           | `"trimSnaps" \| "keepSnaps" \| ""` | Edge scroll behavior.                           |
| `emblaOptions`                            | `EmblaOptionsType`                 | Pass raw Embla options.                         |
| `plugins`                                 | `EmblaPluginType[]`                | Embla plugins (e.g. autoplay).                  |
| `getEmblaApi`                             | `(embla) => void`                  | Access Embla instance.                          |
| `nextControlIcon` / `previousControlIcon` | `ReactNode`                        | Custom arrow icons.                             |
| `initialSlide`                            | `number`                           | Starting slide index.                           |
| `onSlideChange`                           | `(index) => void`                  | Slide change callback.                          |

> Some legacy props live under `emblaOptions`. Prefer
> `emblaOptions={{ loop: true, dragFree: true }}` if a top-level prop is not found.

---

## Example

```tsx
import { Carousel } from "mal-ui/carousel";
import { Image } from "mal-ui/core";

const slides = ["/1.jpg", "/2.jpg", "/3.jpg"];

function Gallery() {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="50%"
      slideGap="md"
      align="start"
      emblaOptions={{ loop: true, dragFree: true }}
    >
      {slides.map((src) => (
        <Carousel.Slide key={src}>
          <Image src={src} h={200} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
```

### Autoplay

```tsx
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const autoplay = useRef(Autoplay({ delay: 3000 }));
<Carousel plugins={[autoplay.current]} emblaOptions={{ loop: true }}>
  …
</Carousel>;
```

> For responsive `slideSize` and all options, search `llm.md` for `### Carousel`.
