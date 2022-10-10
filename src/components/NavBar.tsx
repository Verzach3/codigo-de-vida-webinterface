import { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUsers,
  IconUserPlus,
  IconLogin,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { IS_LOGGED_IN, SHOW_LOGIN } from "../state/State";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  // { link: '', label: 'Notifications', icon: IconBellRinging },
  // { link: '', label: 'Billing', icon: IconReceipt2 },
  // { link: '', label: 'Security', icon: IconFingerprint },
  // { link: '', label: 'Authentication', icon: Icon2fa },
  { link: "", label: "Registros", icon: IconDatabaseImport },
  { link: "", label: "Administrar Usuarios", icon: IconUsers },
  { link: "", label: "Ajustes", icon: IconSettings },
];

export function NavbarSimple(props: any) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Registros");
  const [showLogin, setShowLogin] = useRecoilState(SHOW_LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IS_LOGGED_IN);
  const navigation = useNavigate();
  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      style={{ marginTop: 10}}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        switch (item.label) {
          case "Registros":
            navigation("/");
            break;
          case "Administrar Usuarios":
            navigation("/users");
            break;
          case "Ajustes":
            navigation("/settings");
            break;
          default:
            break;
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 300, lg: 300 }} p="md" hidden={props.opened}>
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
  </a> */}
        {isLoggedIn ? (
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              setShowLogin(!showLogin);
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Cerrar Sesion</span>
          </a>
        ) : (
          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              setShowLogin(!showLogin);
            }}
          >
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <span>Iniciar Sesion</span>
          </a>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
