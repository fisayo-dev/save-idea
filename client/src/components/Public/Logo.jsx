// import brain_svg from "../assets/brain_svg.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/home" className="flex items-center gap-2">
      {/* <img src={brain_svg} alt="" className="h-6 w-6" /> */}
      <h2 className="text-2xl font-extrabold">
        SaveIdea
      </h2>
    </Link>
  );
};

export default Logo;
