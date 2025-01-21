import { Edit } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  // User object context
  const { user } = useAuth();
  // Fetching user details states
  const [userDetailsLoading, setUserDetailsLoading] = useState([]);
  // Beare token
  const token = localStorage.getItem("TOKEN");
  
  const getUserDetails = async () => {
    setUserDetailsLoading([]);
    const url =
      process.env.NODE_ENV == "production"
        ? "https://saveidea.netlify.app"
        : "";
    try {
      const response = await axios.get(`${url}/api/users/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUserDetailsLoading(data);
    } catch (error) {
      setUserDetailsLoading(null);
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="app-container">
      <div className="my-10">
        {userDetailsLoading !== null && userDetailsLoading.length != 0 && (
          <div className="grid gap-4">
            <div className="rounded-xl p-4 border-2 border-gray-400 bg-gray-100">
              <div className="relative grid md:flex items-center gap-6">
                <div className="md:mx-0 mx-auto h-28 w-28 rounded-full bg-gray-300" />
                <div className="flex flex-col gap-1 md:items-start items-center ">
                  <h2 className="font-bold text-2xl">
                    {userDetailsLoading.first_name}{" "}
                    {userDetailsLoading.last_name}
                  </h2>
                  <p className="">{userDetailsLoading.email}</p>
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
        )}

        {userDetailsLoading !== null && userDetailsLoading.length == 0 && (
          <div className="text-center">
            <p>...Getting user details</p>
          </div>
        )}
        {userDetailsLoading === null && (
          <div className="text-center text-red-500">
            <p>
              An error occurred while fetching user details. Please try again
              later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
