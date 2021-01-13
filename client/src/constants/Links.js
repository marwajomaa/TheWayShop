const logoutUser = () => {
  localStorage.removeItem("token");
};

export const adminRoutes = [
  {
    label: "Products",
    href: "/",
  },
  {
    label: "Create Product",
    href: "/create_product",
  },
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "History",
    href: "/history",
  },
  {
    label: "Log Out",
    href: "/",
    onClick: logoutUser,
  },
];

export const unLoggedRoutes = [
  {
    label: "Products",
    href: "/",
  },
  {
    label: "Login",
    href: "/login",
  },
];

export const loggedRoutes = [
  {
    label: "Shop",
    href: "/",
  },
  {
    label: "History",
    href: "/history",
  },
  {
    label: "Log Out",
    href: "/",
    onClick: () => {
      localStorage.removeItem("token");
    },
  },
];
