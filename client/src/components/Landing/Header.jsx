import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import Logo  from "../Public/Logo";
const Header = () => {
  return (
    <div className="app-container py-6">
      <div className="flex items-center justify-between">
       <Logo />
        <div className="hidden md:flex items-center gap-6">
          <Link className="hover:text-white">Home</Link>
          <Link className="hover:text-white">Features</Link>
          <Link className="hover:text-white">Pricing</Link>
          <Link className="hover:text-white">FAQ</Link>
        </div>
        <div className="flex md:hidden">
          <MenuIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
