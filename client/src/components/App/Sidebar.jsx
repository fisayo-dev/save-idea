import { Lightbulb, PlusCircle, PowerIcon, UserCircle } from "lucide-react";
import Logo from "../Public/Logo";
import { NavLink } from "react-router-dom";
import { Star1, Trash } from "iconsax-react";

import { useAuth } from "../../contexts/AuthContext";

export const linksTabs = [
  {
    text: "Ideas",
    link: "/ideas",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    text: "create",
    link: "/create",
    icon: <PlusCircle className="h-6 w-6" />,
  },
  {
    text: "starred",
    link: "/starred",
    icon: <Star1 className="h-6 w-6" />,
  },
  {
    text: "bin",
    link: "/bin",
    icon: <Trash className="h-6 w-6" />,
  },
  {
    text: "profile",
    link: "/profile",
    icon: <UserCircle className="h-6 w-6" />,
  },

  {
    text: "Logout",
    link: "/",
    icon: <PowerIcon className="h-6 w-6" />,
  },
];

export const activeLinks = ({ isActive }) =>
  isActive
    ? "border-2 border-gray-900 bg-yellow-200 p-4 font-bold  rounded-lg shadow-sm"
    : "border-2 border-transparent hover:border-gray-400  hover:bg-gray-100 p-4 text-gray-500 rounded-lg";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="hidden xl:block w-[25vw] h-[100vh] overflow-scroll py-4">
      <div className="flex justify-between items-center p-6">
        <Logo />
        <div className="flex gap-2 items-center">
          <UserCircle className="h-6 w-6" />
        </div>
      </div>
      <hr className="mx-6 w-full"/>
      <div className="grid gap-2 p-6">
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

export default Sidebar;
