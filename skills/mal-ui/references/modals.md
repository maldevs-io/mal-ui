# mal-ui Modals Reference (`mal-ui/modals`)

Re-exports **all of `@mantine/modals` (v9)**: the modals manager for imperative
modals (confirm/context) plus the `<ModalsProvider>`.

**Peer dependency:** none.
**CSS:** included in `mal-ui/styles.css`.

```tsx
import { modals, ModalsProvider } from "mal-ui/modals";
```

---

## Setup

Wrap children in `<ModalsProvider>` inside `MALUIProvider`.

```tsx
<MALUIProvider theme={malTheme}>
  <ModalsProvider>{children}</ModalsProvider>
</MALUIProvider>
```

### `<ModalsProvider>` props

| Prop         | Type                                        | Description                                    |
| ------------ | ------------------------------------------- | ---------------------------------------------- |
| `modals`     | `Record<string, React.FC>`                  | Named context modals (for `openContextModal`). |
| `modalProps` | `ModalProps`                                | Default props applied to all managed modals.   |
| `labels`     | `{ confirm: ReactNode; cancel: ReactNode }` | Default button labels for confirm modals.      |

---

## `modals` API

| Method                                                | Description                                                |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| `modals.open(props)`                                  | Open a generic modal (`children`, `title`, …). Returns id. |
| `modals.openConfirmModal(props)`                      | Open a confirm dialog with confirm/cancel buttons.         |
| `modals.openContextModal({ modal, innerProps, ... })` | Open a pre-registered named modal.                         |
| `modals.close(id)`                                    | Close a specific modal.                                    |
| `modals.closeAll()`                                   | Close every open modal.                                    |

### `openConfirmModal` props

| Prop                               | Type                                               | Description                                     |
| ---------------------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `title`                            | `ReactNode`                                        | Modal title.                                    |
| `children`                         | `ReactNode`                                        | Body content.                                   |
| `labels`                           | `{ confirm; cancel }`                              | Button labels.                                  |
| `confirmProps` / `cancelProps`     | `ButtonProps`                                      | Button styling (e.g. `{ color: 'mal-error' }`). |
| `onConfirm`                        | `() => void`                                       | Called on confirm.                              |
| `onCancel`                         | `() => void`                                       | Called on cancel.                               |
| `onClose`                          | `() => void`                                       | Called on any close.                            |
| `closeOnConfirm` / `closeOnCancel` | `boolean`                                          | Auto-close behavior (default true).             |
| `groupProps`                       | `GroupProps`                                       | Layout of footer buttons.                       |
| plus all `Modal` props             | `size`, `centered`, `radius`, `withCloseButton`, … |

### Generic `modals.open` props

All standard `Modal` props (`title`, `size`, `centered`, `fullScreen`,
`withCloseButton`, `radius`, …) plus `children`.

---

## Examples

```tsx
import { modals } from "mal-ui/modals";
import { Text, Button, TextInput } from "mal-ui/core";

// Confirm (destructive)
function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const confirm = () =>
    modals.openConfirmModal({
      title: "Delete project",
      centered: true,
      children: <Text size="sm">This action cannot be undone. Continue?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "mal-error" },
      onConfirm: onDelete,
    });

  return (
    <Button color="mal-error" onClick={confirm}>
      Delete
    </Button>
  );
}

// Generic modal with content
modals.open({
  title: "Edit name",
  children: (
    <>
      <TextInput label="Name" data-autofocus />
      <Button fullWidth mt="md" onClick={() => modals.closeAll()}>
        Save
      </Button>
    </>
  ),
});
```

### Context modals (typed, reusable)

```tsx
// register
const registry = { delete: DeleteModal };
<ModalsProvider modals={registry}>{children}</ModalsProvider>;

// open by name
modals.openContextModal({
  modal: "delete",
  title: "Delete",
  innerProps: { itemId: "123" },
});
```

> For full prop tables and context-modal typing, search `llm.md` for `### Modals`.
