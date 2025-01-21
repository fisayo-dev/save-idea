import {
    Lightbulb,
    PlusCircle,
    PowerIcon,
    UserCircle,
  } from "lucide-react";
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
  
  const Sidebar = () => {
    const { logout } = useAuth();
    const activeLinks = ({ isActive }) =>
      isActive
        ? "hover:bg-gray-200 px-3 py-3 font-bold  rounded-lg"
        : "hover:bg-gray-200 px-3 py-3 text-gray-500 rounded-lg";
  
    return (
      <div className="hidden xl:block 2xl:w-[20vw] w-[20vw] h-[100vh] py-3 bg-gray-100 overflow-scroll">
        <div className="flex justify-between items-center py-6 px-4">
          <Logo />
          <div className="flex gap-2 items-center">
            <UserCircle className="h-6 w-6" />
          </div>
        </div>
        <div className="grid gap-3 border-t-[0.09rem] border-t-slate-600 px-2 py-5">
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
  