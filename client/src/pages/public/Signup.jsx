import { FormSide } from "../../components";
import { User, Key, Eye, EyeSlash } from "iconsax-react";
import { Loader2Icon, MailIcon, Rocket, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Google from "../../assets/vectors/Google.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Error states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const validateInputs = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First Name is required.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last Name is required.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Valid Email Address is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim() || password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitUserForm = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/signup", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      if (response.status === 201) {
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
    setLoading(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (showRepeatPassword) {
      if (password !== repeatPassword) {
        setRepeatPasswordError("Passwords do not match.");
      } else {
        setRepeatPasswordError("");

        submitUserForm();
      }
    } else {
      if (validateInputs()) {
        setShowRepeatPassword(true);
      }
    }
  };

  return (
    <FormSide formImagePosition="right">
      <div className="grid gap-2">
        <h2 className="text-4xl font-bold text-center">Hey there!</h2>
        <p className="text-center">
          Fill in all the required info to create an account
        </p>
      </div>
      <form
        className="grid gap-6 mx-auto md:w-8/12 w-full"
        onSubmit={handleSignup}
      >
        {!showRepeatPassword && (
          <>
            <div className="grid gap-3">
              <div className="flex gap-4 items-center">
                <div className="grid gap-3 w-full ">
                  <label className="font-bold text-gray-800">First Name</label>
                  <div className="border border-slate-600 rounded-full p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-6 w-6" />
                      <input
                        type="text"
                        className="w-full"
                        placeholder="Fisayo"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>
                  {firstNameError && (
                    <p className="text-red-500 text-sm">{firstNameError}</p>
                  )}
                </div>
                <div className="grid gap-3 w-full">
                  <label className="font-bold text-gray-800">Last Name</label>
                  <div className="border border-slate-600 rounded-full p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      <input
                        type="text"
                        className="w-full"
                        placeholder="Obadina"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  {lastNameError && (
                    <p className="text-red-500 text-sm">{lastNameError}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                <label className="font-bold text-gray-800">Email Address</label>
                <div className="border border-slate-600 rounded-full p-4">
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
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>

              <div className="grid gap-3">
                <label className="font-bold text-gray-800">Password</label>
                <div className="border border-slate-600 rounded-full p-4">
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
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
            </div>
          </>
        )}

        {showRepeatPassword && (
          <div className="grid gap-3">
            <label className="font-bold text-gray-800">Repeat Password</label>
            <div className="border border-slate-600 rounded-full py-4 px-5">
              <div className="flex items-center gap-2">
                <Key className="h-6 w-6" />
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="w-full"
                  placeholder="Re-type your password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {!showPassword2 ? <Eye /> : <EyeSlash />}
                </div>
              </div>
            </div>
            {repeatPasswordError && (
              <p className="text-red-500 text-sm">{repeatPasswordError}</p>
            )}
          </div>
        )}

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="shadow-md disabled:cursor-not-allowed disabled:bg-yellow-300 disabled:text-gray-800 text-[0.9rem] px-4 py-3 flex items-center justify-center gap-2 rounded-full bg-yellow hover-dark-bg-yellow"
          >
            {loading ? (
              <Loader2Icon className="animate-spin h-6 w-6" />
            ) : (
              <Rocket className="h-4 w-4 md:h-6 md:w-6" />
            )}
            {!loading ? (
              <p className="capitalize">
                {showRepeatPassword ? "Submit" : "Signup"}
              </p>
            ) : (
              <p className="capitalize">Signing up</p>
            )}
          </button>
          <button className="shadow-md text-[0.9rem] px-4 py-3 font-bold flex items-center justify-center gap-2 rounded-full bg-yellow-100 text-gray-900 hover:bg-yellow-200">
            <img src={Google} width={20} height={20} />
          </button>
        </div>

        {!showRepeatPassword && (
          <div className="text-sm text-center flex gap-1 justify-center">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-gray-800 font-bold hover:underline"
            >
              Login
            </Link>
          </div>
        )}
      </form>
    </FormSide>
  );
};

export default Signup;
