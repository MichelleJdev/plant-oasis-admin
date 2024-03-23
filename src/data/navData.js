import { BiUser } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { GiFlowerPot } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiPlusCircle } from "react-icons/bi";
import { BiStoreAlt } from "react-icons/bi";
import { RiOrganizationChart } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";

export const sideNavData = [
  {
    relativePath: "",
    absolutePath: "/",
    title: "Dashboard",
    icon: LuLayoutDashboard,
  },
  {
    relativePath: "products",
    absolutePath: "/products",
    title: "Products",
    icon: GiFlowerPot,
  },
  {
    relativePath: "users",
    absolutePath: "/users",
    title: "Users",
    icon: BiUser,
  },
  {
    relativePath: "orders",
    absolutePath: "/orders",
    title: "Orders",
    icon: BiShoppingBag,
  },
  {
    relativePath: "categories",
    absolutePath: "/categories",
    title: "Categories",
    icon: RiOrganizationChart,
  },
];

export const productsNavData = [
  {
    relativePath: "",
    absolutePath: "/products",
    title: "Inventory",
    icon: BiStoreAlt,
  },
  {
    relativePath: "create",
    absolutePath: "/products/create",
    title: "New Product",
    icon: BiPlusCircle,
  },
];
export const categoriesNavData = [
  {
    relativePath: "",
    absolutePath: "/categories",
    title: "Categories",
    icon: AiOutlineEdit,
  },
  {
    relativePath: "create",
    absolutePath: "/categories/create",
    title: "New Category",
    icon: BiPlusCircle,
  },
];
export const usersNavData = [
  {
    relativePath: "",
    absolutePath: "/users",
    title: "Users",
    icon: AiOutlineEdit,
  },
  {
    relativePath: "create",
    absolutePath: "/users/create",
    title: "New User",
    icon: BiPlusCircle,
  },
];
export const ordersNavData = [
  {
    relativePath: "",
    absolutePath: "/orders",
    title: "Orders",
    icon: BiShoppingBag,
  },
];
export const dashboardNavData = [
  {
    relativePath: "",
    absolutePath: "/",
    title: "Dashboard",
    icon: LuLayoutDashboard,
  },
];
