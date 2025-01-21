import { Edit } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  // Fetching user detrails states
  const [userDetailsLoading, setUserDetailsLoading] = useState(null);

  const getUserDetails = async () => {
    const url =
      process.env.NODE_ENV == "production"
        ? "https://saveidea.netlify.app"
        : "";
    try {
      const response = await axios.get(`${url}/api/users/${user}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="app-container">
      <div className="my-10">
        <div className="grid gap-4">
          <div className="rounded-xl p-4 border-2 border-gray-400 bg-gray-100">
            <div className="relative grid md:flex items-center gap-6">
              <div className="md:mx-0 mx-auto h-28 w-28 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-1 md:items-start items-center ">
                <h2 className="font-bold text-2xl">Fisayo Obadina</h2>
                <p className="">olufisayobadina@gmail.com</p>
                <p className="text-sm">Joined Yesterday</p>
              </div>
              <div className="md:block hidden absolute bottom-1 right-1">
                <button className="shadow-md text-[0.8rem] md:text-[0.9rem] px-3 py-2 flex items-center gap-2 border border-gray-500 rounded-full bg-yellow hover-dark-bg-yellow">
                  <Edit />
                  <p>Edit profile</p>
                </button>
              </div>
              <button className="md:hidden mx-auto shadow-md text-[0.9rem]  px-3 py-2 flex items-center gap-2 border border-gray-500 rounded-full bg-yellow hover-dark-bg-yellow">
                <Edit />
                <p>Edit Profile</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
