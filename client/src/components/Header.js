import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

const headersData = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Login",
    href: "/login",
  },
];

const headersDataLogin = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "My Account",
    href: "/account",
  },
  {
    label: "Log Out",
    href: "/logout",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#fff",
    paddingRight: "79px",
    paddingLeft: "118px",
    color: "red",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "red",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    color: "red",
  },
  drawerContainer: {
    padding: "20px 30px",
    color: "red",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    isLogin: true,
  });

  const { mobileView, drawerOpen, isLogin } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {Logo}
        <div>{getMenuButtons()}</div>
        {isLogin && (
          <div style={{ marginLeft: "110px" }}>
            <IconButton>
              <Badge badgeContent={5} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{Logo}</div>
        {isLogin && (
          <div style={{ marginLeft: "110px" }}>
            <IconButton>
              <Badge badgeContent={5} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return isLogin
      ? headersDataLogin.map(({ label, href }) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          );
        })
      : headersData.map(({ label, href }) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          );
        });
  };

  const Logo = (
    <Typography variant="h6" component="h1" className={logo}>
      Shopify
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
