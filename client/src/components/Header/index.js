import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Link,
  Grid,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  adminRoutes,
  loggedRoutes,
  unLoggedRoutes,
} from "../../constants/Links";
import { Logo } from "../Logo";
import { ShoppingCart } from "../ShoppingCart";
import { useStyles } from "./Header.Style.js";
import { GlobalState } from "../../GlobalState";

export default function Header() {
  const globalState = useContext(GlobalState);
  const [isLoggedIn] = globalState.token;
  const [token] = globalState.userAPI.isLoggedIn;
  const [isAdmin] = globalState.userAPI.isAdmin;
  const { header, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    mobileRoutes();
    desktopRoutes();
  }, [isLoggedIn, token, isAdmin]);

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
      <Toolbar container xs={12} className={toolbar}>
        {isAdmin ? "ADMIN" : Logo}
        <div>
          {desktopRoutes()}
          <ShoppingCart />
        </div>
      </Toolbar>
    );
  };

  const mobileRoutes = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return adminRoutes.map(({ label, href }) => {
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
      }
      return loggedRoutes.map(({ label, href }) => {
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
    }
    console.log("unLoggedRoutes");
    return unLoggedRoutes.map(({ label, href }) => {
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

  const desktopRoutes = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return adminRoutes.map(({ label, href }) => {
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
      }
      return loggedRoutes.map(({ label, href }) => {
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
    }
    console.log("unLoggedRoutes");
    return unLoggedRoutes.map(({ label, href }) => {
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

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <>
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
            <div className={drawerContainer}>{mobileRoutes()}</div>
          </Drawer>

          {isAdmin ? "ADMIN" : Logo}
        </Toolbar>
        <ShoppingCart />
      </>
    );
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
