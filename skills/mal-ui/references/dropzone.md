# mal-ui Dropzone Reference (`mal-ui/dropzone`)

Re-exports **all of `@mantine/dropzone` (v9)** — a drag-and-drop file upload area.

**Peer dependency:** none.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { Dropzone, IMAGE_MIME_TYPE } from "mal-ui/dropzone";
```

---

## Components & constants

| Export                                                                 | Use                                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `Dropzone`                                                             | Drag-and-drop / click upload area.                                                 |
| `Dropzone.Accept`                                                      | Children shown while dragging acceptable files.                                    |
| `Dropzone.Reject`                                                      | Children shown while dragging rejected files.                                      |
| `Dropzone.Idle`                                                        | Children shown when idle.                                                          |
| `Dropzone.FullScreen`                                                  | Full-screen drop overlay variant.                                                  |
| `IMAGE_MIME_TYPE`                                                      | `['image/png','image/gif','image/jpeg','image/svg+xml','image/webp','image/avif']` |
| `PDF_MIME_TYPE`                                                        | `['application/pdf']`                                                              |
| `MS_WORD_MIME_TYPE` / `MS_EXCEL_MIME_TYPE` / `MS_POWERPOINT_MIME_TYPE` | Office mime arrays                                                                 |
| `MIME_TYPES`                                                           | Map of common mime types                                                           |

## `Dropzone` props

| Prop                                    | Type                                    | Description                                |
| --------------------------------------- | --------------------------------------- | ------------------------------------------ |
| `onDrop`                                | `(files: FileWithPath[]) => void`       | **Required.** Accepted files.              |
| `onReject`                              | `(rejections: FileRejection[]) => void` | Rejected files w/ errors.                  |
| `accept`                                | `string[] \| Record<string,string[]>`   | Allowed mime types (use the constants).    |
| `maxSize`                               | `number`                                | Max file size in bytes.                    |
| `maxFiles`                              | `number`                                | Max number of files (`0` = unlimited).     |
| `multiple`                              | `boolean`                               | Allow multiple files (default true).       |
| `loading`                               | `boolean`                               | Show loading overlay, disable interaction. |
| `disabled`                              | `boolean`                               | Disable the dropzone.                      |
| `activateOnClick`                       | `boolean`                               | Open file dialog on click (default true).  |
| `activateOnDrag` / `activateOnKeyboard` | `boolean`                               | Activation modes.                          |
| `openRef`                               | `ForwardedRef<() => void>`              | Imperatively open the file dialog.         |
| `name`                                  | `string`                                | Input name.                                |
| `radius` / `padding`                    | tokens                                  | Styling.                                   |
| `onDropAny`                             | `(accepted, rejected) => void`          | Both lists.                                |

---

## Example

```tsx
import { Dropzone, IMAGE_MIME_TYPE } from "mal-ui/dropzone";
import { Group, Text } from "mal-ui/core";
import { UploadIcon, XIcon, ImageIcon } from "@phosphor-icons/react";

function ImageUpload() {
  return (
    <Dropzone
      onDrop={(files) => console.log("accepted", files)}
      onReject={(files) => console.log("rejected", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group
        justify="center"
        gap="xl"
        mih={140}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <UploadIcon size={48} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <XIcon size={48} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <ImageIcon size={48} />
        </Dropzone.Idle>
        <Text size="xl">Drag images here or click to select</Text>
      </Group>
    </Dropzone>
  );
}
```

> For full-screen mode and the `openRef` pattern, search `llm.md` for `### Dropzone`.
