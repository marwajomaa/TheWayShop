const logoutUser = () => {
  localStorage.removeItem("token");
};

export const adminRoutes = [
  {
    label: "products",
    href: "/products",
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
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/Products",
  },
];

export const loggedRoutes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/Products",
  },
  {
    label: "History",
    href: "/history",
  },
];
