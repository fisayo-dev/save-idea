import { FormSide } from "../../components";
import { User, Key, Eye, EyeSlash } from "iconsax-react";
import { Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import Google from "../../assets/vectors/Google.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <FormSide>
      <div className="grid gap-2">
        <h2 className="text-4xl font-bold text-center">Welcome Back!</h2>
        <p className="text-center">
          Login to your account with your credentials
        </p>
      </div>
      <form className="grid gap-6 mx-auto md:w-8/12 w-full">
          <div className="grid gap-3">
            <div className="grid gap-3">
              <label className="font-bold text-gray-800">Email Address</label>
              <div className="border border-slate-600 rounded-full py-4 px-5">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6" />
                  <input
                    type="email"
                    className="w-full"
                    placeholder="olufisayobadina@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <label className="font-bold text-gray-800">Password</label>
              <div className="border border-slate-600 rounded-full py-4 px-5">
                <div className="flex items-center gap-2">
                  <Key className="h-6 w-6" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full"
                    placeholder="My very strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {!showPassword ? <Eye /> : <EyeSlash />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <button className="shadow-md text-[0.9rem] px-4 py-3 flex items-center justify-center gap-2 rounded-full bg-yellow hover-dark-bg-yellow">
              <Rocket className="h-4 w-4 md:h-6 md:w-6" />
              <p className="capitalize">Login </p>
            </button>
            <button className="shadow-md text-[0.9rem]  px-4 py-3 font-bold flex items-center justify-center gap-2 rounded-full bg-yellow-100 text-gray-900 hover:bg-yellow-200">
              <img src={Google} width={20} height={20} />
            </button>
          </div>
          <div className="text-sm text-center flex gap-1 justify-center">
            <p>Are you new here?</p>
            <Link to="/signup" className="text-gray-800 font-bold hover:underline">
              Signup
            </Link>
          </div>
        </form>
    </FormSide>
  );
};

export default Login;
