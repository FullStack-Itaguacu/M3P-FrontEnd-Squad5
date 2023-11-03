import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BiPurchaseTagAlt } from "react-icons/bi";

export const SidebarAdminData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Minhas vendas",
    path: "/sales",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Meus produtos",
    path: "/meus-produtos",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Novo usuário",
    path: "/createUser",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Minhas compras",
    path: "/purchases",
    icon: <BiPurchaseTagAlt />,
    cName: "nav-text",
  },
  {
    title: "Produtos",
    path: "/products",
    icon: <FaIcons.FaLayerGroup />,
    cName: "nav-text",
  },
  {
    title: "Carrinho",
    path: "/carrinho-de-compras",
    icon: <FaIcons.FaTruck />,
    cName: "nav-text",
  },
  {
    title: "Suporte",
    path: "/support",
    icon: <IoIcons.IoIosAlert />,
    cName: "nav-text",
  },
];
