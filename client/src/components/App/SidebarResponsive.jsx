import { UserCircle } from "lucide-react";
import Logo from "../Public/Logo";
import { NavLink } from "react-router-dom";
import { linksTabs } from "./Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { activeLinks } from "./Sidebar";

const SidebarResponsive = () => {
  const { logout } = useAuth();
  return (
    <div
      className="z-50 block xl:hidden w-[70vw]
           h-[100vh] py-4 bg-white overflow-scroll"
    >
      <div className="flex justify-between items-center p-6">
        <Logo />
        <div className="flex gap-2 items-center">
          <UserCircle className="h-6 w-6" />
        </div>
      </div>
      <div className="grid gap-2 border-t-[0.09rem] border-t-slate-600 p-6">
        {linksTabs.map((link, index) => (
          <NavLink
            onClick={() => {
              link.text === "Logout" && logout();
            }}
            key={index}
            to={link.link}
            className={activeLinks}
          >
            <div className="flex text-xl items-center gap-2">
              {link.icon}
              <p className="capitalize">{link.text}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarResponsive;
