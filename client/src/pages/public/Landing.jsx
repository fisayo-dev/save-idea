import { Link, useNavigate } from "react-router-dom";
import { Rocket, SearchIcon } from "lucide-react";
import landing_blub from "../../assets/vectors/landing_blub.png";
import { useEffect } from "react";
import { Header } from "../../components";
import { useAuth } from "../../contexts/AuthContext";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const res = await fetch("/api/");
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/ideas");
    }
    fetchData();
  }, [user]);
  return (
    <div>
      <Header />
      <div className="py-5">
        <div className="app-container">
          <div className="grid md:flex md:my-0 my-10 gap-5 md:justify-between items-center">
            <div className="grid gap-4 md:text-left md:place-items-start place-items-center text-center">
              <h2 className="lg:text-5xl text-4xl capitalize font-bold">
                Unleash Your Creativity, Empower Your Ideas
              </h2>
              <p className="text-[0.82rem] sm:text-[1rem]">
                Capture, organize, and act on your inspirations
                seamlessly—because your ideas deserve more than just a fleeting
                moment.
              </p>
              <div className="flex my-3 gap-2 place-items-center items-center justify-center ">
                <Link to="/signup">
                  <button className="shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex items-center gap-2 border border-gray-500 rounded-full bg-yellow hover-dark-bg-yellow">
                    <Rocket />
                    <p>Get Started</p>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="shadow-md text-[0.8rem] md:text-[1rem] px-4 py-3 flex gap-2 items-center rounded-full border border-gray-500 hover-dark-bg-yellow ">
                    <SearchIcon />
                    <p>Explore Features</p>
                  </button>
                </Link>
              </div>
            </div>
            <img
              src={landing_blub}
              alt=""
              className="grid md:mr-auto md:place-items-end place-items-center mx-auto justify-end items-center w-9/12 md:w-6/12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
