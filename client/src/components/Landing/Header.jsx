import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import Logo  from "../Public/Logo";
const Header = () => {
  return (
    <div className="app-container py-6">
      <div className="flex items-center justify-between">
       <Logo />
        <div className="hidden md:flex items-center gap-6">
          <Link to='/signup' className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Signup</Link>
          <Link to="/login" className="border-b-transparent border-b-[0.15rem] hover:border-b-gray-900">Login</Link>
          
        </div>
        <div className="flex md:hidden">
          <MenuIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Header;
