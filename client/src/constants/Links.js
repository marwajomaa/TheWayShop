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
];

export const unLoggedRoutes = [
  {
    label: "Products",
    href: "/",
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
];
