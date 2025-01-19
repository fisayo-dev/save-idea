import { FormSide } from "../../components";
import { Key, Eye, EyeSlash } from "iconsax-react";
import { MailIcon, Rocket } from "lucide-react";
import { useState } from "react";
import Google from "../../assets/vectors/Google.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to handle errors

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setError(null);

    // Client-side validation
    if (!email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    // When there are no errors, login in user
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        login(token);
      } else {
        alert("Error:", response.message);
      }
    } catch (error) {
      console.error(
        "Error occurred during signup:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <FormSide formImagePosition="left">
      <div className="grid gap-2">
        <h2 className="text-4xl font-bold text-center">Welcome Back!</h2>
        <p className="text-center">
          Login to your account with your credentials
        </p>
      </div>
      <form
        className="grid gap-6 mx-auto md:w-8/12 w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-3">
          <div className="grid gap-3">
            <label className="font-bold text-gray-800">Email Address</label>
            <div className="border border-slate-600 rounded-full py-4 px-5">
              <div className="flex items-center gap-2">
                <MailIcon className="h-6 w-6" />
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

        {/* Display error message */}
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="shadow-md text-[0.9rem] px-4 py-3 flex items-center justify-center gap-2 rounded-full bg-yellow hover-dark-bg-yellow"
          >
            <Rocket className="h-4 w-4 md:h-6 md:w-6" />
            <p className="capitalize">Login</p>
          </button>
          <button
            type="button"
            className="shadow-md text-[0.9rem] px-4 py-3 font-bold flex items-center justify-center gap-2 rounded-full bg-yellow-100 text-gray-900 hover:bg-yellow-200"
          >
            <img
              alt="Google sign-in image"
              src={Google}
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="text-sm text-center flex gap-1 justify-center">
          <p>Are you new here?</p>
          <Link
            to="/signup"
            className="text-gray-800 font-bold hover:underline"
          >
            Signup
          </Link>
        </div>
      </form>
    </FormSide>
  );
};

export default Login;
