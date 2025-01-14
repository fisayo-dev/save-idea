import {
    Brain,
    LayoutDashboardIcon,
    PowerIcon,
    Sigma,
    UserCircle,
  } from "lucide-react";
  import { Logo } from ".";
  import { NavLink } from "react-router-dom";
  import {
    Calculator,
    Computing,
    Convert,
    Note,
    Profile,
  } from "iconsax-react";
  import { useAuth } from "../../contexts/AuthContext";
  
  const Sidebar = () => {
    const { logout } = useAuth();
    const activeLinks = ({ isActive }) =>
      isActive
        ? "hover:bg-slate-900 px-3 py-3 color-pink font-bold rounded-lg"
        : "hover:bg-slate-900 px-3 py-3 text-slate-400 hover-color-pink rounded-lg";
  
    const linksTabs = [
      {
        text: "Dashboard",
        link: "/dashboard",
        icon: <LayoutDashboardIcon className="h-6 w-6" />,
      },
      {
        text: "Whiteboard",
        link: "/whiteboard",
        icon: <Note className="h-6 w-6" />,
      },
      {
        text: "Converter",
        link: "/converter",
        icon: <Convert className="h-6 w-6" />,
      },
      {
        text: "Calculator",
        link: "/calculator",
        icon: <Calculator className="h-6 w-6" />,
      },
      {
        text: "Abscissa AI",
        link: "/abscissa-ai",
        icon: <Brain className="h-6 w-6" />,
      },
      {
        text: "Problem Solver",
        link: "/problem-solver",
        icon: <Computing className="h-6 w-6" />,
      },
      {
        text: "Formulae Bank",
        link: "/formulae-bank",
        icon: <Sigma className="h-6 w-6" />,
      },
      {
        text: "Profile",
        link: "/profile",
        icon: <Profile className="h-6 w-6" />,
      },
      {
        text: "Logout",
        link: "/",
        icon: <PowerIcon className="h-6 w-6" />,
      },
    ];
    return (
      <div
        className="z-50 block xl:hidden w-[70vw]
           h-[100vh] py-3 border-r-[0.1rem] border-r-slate-500 dark-bg-blue overflow-scroll"
      >
        <div className="flex justify-between items-center py-6 px-4">
          <Logo />
          <div className="flex gap-2 items-center">
            <UserCircle className="h-6 w-6" />
          </div>
        </div>
        <div className="grid gap-2 border-t-[0.09rem] border-t-slate-600 px-2 py-5">
          {linksTabs.map((link, index) => (
            <NavLink
              onClick={() => {
                link.text === "Logout" && logout();
              }}
              key={index}
              to={link.link}
              className={activeLinks}
            >
              <div className="flex items-center gap-2">
                {link.icon}
                <p>{link.text}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  