# mal-ui Tiptap Reference (`mal-ui/tiptap`)

Re-exports **all of `@mantine/tiptap` (v9)** — a rich-text editor UI built on the
**Tiptap** editor.

**Peer dependencies:**
`npm i @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link`
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { RichTextEditor, Link } from "mal-ui/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
```

---

## Components

| Export                         | Use                                                                                                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RichTextEditor`               | Root editor wrapper.                                                                                                                                                                                                                                                                    |
| `RichTextEditor.Toolbar`       | Toolbar container (`sticky`, `stickyOffset`).                                                                                                                                                                                                                                           |
| `RichTextEditor.ControlsGroup` | Groups controls.                                                                                                                                                                                                                                                                        |
| `RichTextEditor.Content`       | Editable content area.                                                                                                                                                                                                                                                                  |
| `RichTextEditor.Control`       | Custom control button.                                                                                                                                                                                                                                                                  |
| `Link`                         | Tiptap link extension pre-configured for the editor.                                                                                                                                                                                                                                    |
| Built-in controls              | `Bold`, `Italic`, `Underline`, `Strikethrough`, `ClearFormatting`, `Highlight`, `Code`, `CodeBlock`, `H1`–`H4`, `Blockquote`, `Hr`, `BulletList`, `OrderedList`, `Subscript`, `Superscript`, `Link`, `Unlink`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`, `Undo`, `Redo` |

All controls are accessed as `RichTextEditor.Bold`, `RichTextEditor.H1`, etc.

## `RichTextEditor` props

| Prop                      | Type                    | Description                                            |
| ------------------------- | ----------------------- | ------------------------------------------------------ |
| `editor`                  | `Editor \| null`        | **Required.** Tiptap editor instance from `useEditor`. |
| `children`                | `ReactNode`             | Toolbar + content.                                     |
| `variant`                 | `"default" \| "subtle"` | Visual variant.                                        |
| `withCodeHighlightStyles` | `boolean`               | Apply code highlight styles.                           |
| `withTypographyStyles`    | `boolean`               | Apply typography styles.                               |
| `labels`                  | `RichTextEditorLabels`  | Accessible control labels.                             |

---

## Example

```tsx
"use client";
import { RichTextEditor, Link } from "mal-ui/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function Editor() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "<p>Hello <b>mal-ui</b>!</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

> Tiptap editor logic (`useEditor`, extensions) comes from `@tiptap/*` directly;
> `mal-ui/tiptap` only provides the styled UI. For all controls and labels, search
> `llm.md` for `### RichTextEditor`.
