import { useAuth } from "../../context/AuthContext";
import SidebarAdmin from "./SideBarAdmin";
import SidebarBuyer from "./SidebarBuyer";

function Sidebar() {
  const { token, isAdmin } = useAuth();

  if (token && isAdmin == "S") return <SidebarAdmin />;
  if (token) return <SidebarBuyer />;
}

export default Sidebar;
