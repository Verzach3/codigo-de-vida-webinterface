import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconLock, IconAt } from "@tabler/icons";
import {
  TextInput,
  PasswordInput,
  Group,
  Checkbox,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import Pocketbase from "pocketbase";
import { IS_LOGGED_IN, SERVER_URL, SHOW_LOGIN } from "./state/State";
import { useRecoilState, useSetRecoilState } from "recoil";

export interface AuthenticationFormProps {
  noShadow?: boolean;
  noPadding?: boolean;
  noSubmit?: boolean;
  style?: React.CSSProperties;
}

export function AuthenticationForm({
  noShadow,
  noPadding,
  noSubmit,
  style,
}: AuthenticationFormProps) {
  const [formType, setFormType] = useState<"register" | "login">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IS_LOGGED_IN)
  const setShowLogin = useSetRecoilState(SHOW_LOGIN);
  const theme = useMantineTheme();

  const toggleFormType = () => {
    setFormType((current) => (current === "register" ? "login" : "register"));
    setError(null);
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
      admin: false,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const client = new Pocketbase(SERVER_URL);
    try {
      if (form.values.admin) {
        await client.admins.authViaEmail(form.values.email, form.values.password);
      } else {
        await client.users.authViaEmail(form.values.email, form.values.password);
      }
    } catch (error) {
      setError("Sorry, we couldn't process your request. Please try again.");
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
    setShowLogin(false)
    setLoading(false);
  };

  return (
    <Paper
      p={noPadding ? 0 : "lg"}
      shadow={noShadow ? undefined : "sm"}
      style={{
        position: "relative",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        ...style,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading} />
        {formType === "register" && (
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="Primer Nombre"
              label="First name"
              {...form.getInputProps("firstName")}
            />

            <TextInput
              required
              placeholder="Apellidos"
              label="Last name"
              {...form.getInputProps("lastName")}
            />
          </Group>
        )}

        <TextInput
          mt="md"
          required
          placeholder="Tu Correo"
          label="Correo"
          icon={<IconAt size={16} stroke={1.5} />}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          mt="md"
          required
          placeholder="Constraseña"
          label="Password"
          icon={<IconLock size={16} stroke={1.5} />}
          {...form.getInputProps("password")}
        />

        <Checkbox
          mt="xl"
          label="Admin?"
          {...form.getInputProps("admin", { type: "checkbox" })}
        />

        {formType === "register" && (
          <PasswordInput
            mt="md"
            required
            label="Confirmar contraseña"
            placeholder="Confirm password"
            icon={<IconLock size={16} stroke={1.5} />}
            {...form.getInputProps("confirmPassword")}
          />
        )}

        {formType === "register" && (
          <Checkbox
            mt="xl"
            label="Acepto los terminos"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
        )}

        {error && (
          <Text color="red" size="sm" mt="sm">
            {error}
          </Text>
        )}

        {!noSubmit && (
          <Group position="apart" mt="xl">
            {/* <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={toggleFormType}
              size="sm"
            >
              {formType === 'register'
                ? 'Have an account? Login'
                : "Don't have an account? Register"}
            </Anchor> */}

            <Button color="blue" type="submit">
              {formType === "register" ? "Register" : "Login"}
            </Button>
          </Group>
        )}
      </form>
    </Paper>
  );
}
