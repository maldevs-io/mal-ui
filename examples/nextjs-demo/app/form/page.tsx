'use client';

import {
  Button,
  Card,
  Checkbox,
  Code,
  Group,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Title,
} from 'mal-ui/core';
import { useForm } from 'mal-ui/form';
import { notifications } from 'mal-ui/notifications';

interface SignupValues {
  name: string;
  email: string;
  password: string;
  age: number | '';
  role: string;
  terms: boolean;
}

export default function FormPage() {
  const form = useForm<SignupValues>({
    mode: 'controlled',
    initialValues: { name: '', email: '', password: '', age: '', role: '', terms: false },
    validate: {
      name: (v) => (v.length < 2 ? 'At least 2 chars' : null),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length < 6 ? 'Min 6 chars' : null),
      age: (v) => (v === '' || v < 13 ? 'Must be 13+' : null),
      role: (v) => (!v ? 'Pick one' : null),
      terms: (v) => (!v ? 'You must accept' : null),
    },
  });

  return (
    <Stack gap="lg">
      <Title order={2}>Form</Title>
      <Card withBorder padding="md">
        <form
          onSubmit={form.onSubmit((values) => {
            notifications.show({ title: 'Submitted', message: JSON.stringify(values) });
          })}
        >
          <Stack>
            <TextInput label="Name" {...form.getInputProps('name')} />
            <TextInput label="Email" {...form.getInputProps('email')} />
            <PasswordInput label="Password" {...form.getInputProps('password')} />
            <NumberInput label="Age" {...form.getInputProps('age')} />
            <Select label="Role" data={['admin', 'editor', 'viewer']} {...form.getInputProps('role')} />
            <Checkbox label="I accept the terms" {...form.getInputProps('terms', { type: 'checkbox' })} />
            <Group>
              <Button type="submit">Submit</Button>
              <Button variant="subtle" onClick={() => form.reset()}>Reset</Button>
            </Group>
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
}
