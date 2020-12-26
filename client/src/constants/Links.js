const logoutUser = () => {
  localStorage.removeItem("token");
};

export const adminRoutes = [
  {
    label: "Create Product",
    href: "/create_product",
  },
  {
    label: "Categories",
    href: "/category",
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
    label: "My Account",
    href: "/account",
  },
  {
    label: "Log Out",
    href: "/",
    onClick: () => {
      localStorage.removeItem("token");
    },
  },
];
