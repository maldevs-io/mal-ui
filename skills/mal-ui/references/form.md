# mal-ui Form Reference (`mal-ui/form`)

`mal-ui/form` re-exports **all of `@mantine/form` (v9)**: the `useForm` hook,
validators, and helpers. No extra peer dependency required.

```tsx
import { useForm, isEmail, isNotEmpty, hasLength } from "mal-ui/form";
import { TextInput, PasswordInput, Button, Stack } from "mal-ui/core";
```

---

## `useForm`

```ts
const form = useForm<Values>(config);
```

### Config options

| Option                            | Type                                               | Description                                                     |
| --------------------------------- | -------------------------------------------------- | --------------------------------------------------------------- |
| `mode`                            | `"controlled" \| "uncontrolled"`                   | Re-render strategy. `"uncontrolled"` (default in v9) is faster. |
| `initialValues`                   | `Values`                                           | Starting field values (required).                               |
| `initialErrors`                   | `Record<string,ReactNode>`                         | Initial error map.                                              |
| `initialDirty` / `initialTouched` | `Record<string,boolean>`                           | Initial dirty/touched state.                                    |
| `validate`                        | `Record<keyof Values, Rule> \| (values) => Errors` | Field rules or whole-form validator.                            |
| `validateInputOnChange`           | `boolean \| string[]`                              | Validate on change (all or listed paths).                       |
| `validateInputOnBlur`             | `boolean \| string[]`                              | Validate on blur.                                               |
| `clearInputErrorOnChange`         | `boolean`                                          | Clear a field error when it changes (default `true`).           |
| `transformValues`                 | `(values) => Transformed`                          | Transform before submit.                                        |
| `onValuesChange`                  | `(values, previous) => void`                       | Side effect on change.                                          |
| `enhanceGetInputProps`            | `(payload) => object`                              | Inject extra props.                                             |

### Returned API

| Member                                                                       | Description                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `values`                                                                     | Current values.                                                |
| `getValues()`                                                                | Read current values (uncontrolled mode).                       |
| `setValues(partial)`                                                         | Merge values.                                                  |
| `setFieldValue(path, value)`                                                 | Set one field.                                                 |
| `getInputProps(path, options?)`                                              | Spread onto an input: `{ value, onChange, error, onBlur, … }`. |
| `getInputNode(path)`                                                         | DOM node for a field.                                          |
| `onSubmit(handleSubmit, handleError?)`                                       | Form `onSubmit` wrapper; runs validation.                      |
| `onReset`                                                                    | Reset handler.                                                 |
| `reset()` / `resetDirty()` / `resetTouched()`                                | Reset state.                                                   |
| `validate()`                                                                 | Validate all; returns `{ hasErrors, errors }`.                 |
| `validateField(path)`                                                        | Validate one field.                                            |
| `errors` / `setErrors` / `setFieldError` / `clearErrors` / `clearFieldError` | Error management.                                              |
| `isValid(path?)`                                                             | Validity check without setting errors.                         |
| `isDirty(path?)` / `isTouched(path?)`                                        | Change/interaction state.                                      |
| `setDirty` / `setTouched`                                                    | Set state maps.                                                |
| `getTransformedValues()`                                                     | Apply `transformValues`.                                       |
| `insertListItem(path, item, index?)`                                         | Add to array field.                                            |
| `removeListItem(path, index)`                                                | Remove from array field.                                       |
| `reorderListItem(path, { from, to })`                                        | Reorder array field.                                           |
| `replaceListItem(path, index, item)`                                         | Replace array item.                                            |
| `key(path)`                                                                  | Stable key for list rendering (uncontrolled mode).             |
| `watch(path, callback)`                                                      | Subscribe to a field.                                          |
| `getInputProps` options                                                      | `{ type?: 'input' \| 'checkbox', withError?, withFocus? }`     |

For checkboxes/switches use `getInputProps('field', { type: 'checkbox' })`.

---

## Built-in validators

All return a validator function `(value, values, path) => ReactNode | null`.

| Validator                                     | Signature | Use                                          |
| --------------------------------------------- | --------- | -------------------------------------------- |
| `isNotEmpty(error?)`                          | –         | Value must be non-empty                      |
| `isEmail(error?)`                             | –         | Valid email                                  |
| `matches(regexp, error?)`                     | –         | Matches a pattern                            |
| `isInRange({ min?, max? }, error?)`           | –         | Number within range                          |
| `hasLength({ min?, max? } \| number, error?)` | –         | String/array length                          |
| `matchesField(field, error?)`                 | –         | Equals another field (e.g. confirm password) |

Compose multiple rules on one field with `isNotEmpty` + custom, or build with
helpers `hasLength`, `matches`, etc. You can also write inline functions.

```ts
validate: {
  email: isEmail('Invalid email'),
  password: hasLength({ min: 8 }, 'At least 8 characters'),
  confirm: matchesField('password', 'Passwords do not match'),
  age: (value) => (value < 18 ? 'Must be 18+' : null),
}
```

Nested paths use dot/bracket notation: `'user.address.city'`, `'items.0.name'`.

---

## Full example

```tsx
import { useForm, isEmail, hasLength, matchesField } from "mal-ui/form";
import { TextInput, PasswordInput, Checkbox, Button, Stack } from "mal-ui/core";

interface Values {
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}

function SignupForm() {
  const form = useForm<Values>({
    mode: "uncontrolled",
    initialValues: { email: "", password: "", confirm: "", terms: false },
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 8 }, "Min 8 characters"),
      confirm: matchesField("password", "Passwords differ"),
      terms: (v) => (v ? null : "You must accept"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput label="Email" {...form.getInputProps("email")} />
        <PasswordInput label="Password" {...form.getInputProps("password")} />
        <PasswordInput label="Confirm" {...form.getInputProps("confirm")} />
        <Checkbox
          label="Accept terms"
          {...form.getInputProps("terms", { type: "checkbox" })}
        />
        <Button type="submit">Create account</Button>
      </Stack>
    </form>
  );
}
```

### List fields

```tsx
form.insertListItem("jobs", { company: "", years: 0 });
form.values.jobs.map((_, i) => (
  <TextInput
    key={form.key(`jobs.${i}.company`)}
    {...form.getInputProps(`jobs.${i}.company`)}
  />
));
form.removeListItem("jobs", 1);
```

> For advanced patterns (schema resolvers like zod/yup via `mantine-form-*-resolver`,
> `watch`, nested validation), search `llm.md` for `### use-form` / form guides.
