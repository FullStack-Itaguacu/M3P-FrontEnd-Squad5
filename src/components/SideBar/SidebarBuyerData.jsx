import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BiPurchaseTagAlt } from "react-icons/bi";

export const SidebarBuyerData = [
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
];
