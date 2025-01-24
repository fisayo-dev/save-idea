import { SearchNormal } from "iconsax-react";
import { LayoutGrid, LayoutList, LucideTarget } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";

const Ideas = () => {
  const { user } = useAuth();
  const [ideasList, setIdeasList] = useState([]);
  const [error, setError] = useState(null);

  const fetchIdeas = async () => {
    try {
      const response = await axiosInstance.get(`/ideas/${user}`);
      const data = response.data;
      setIdeasList(data.ideas);
      setError(null);
    } catch (err) {
      setIdeasList([]);
      setError(err.message || "An unknown error occurred");
    }
  };

  const getDateInEnglish = (date) => {
    const day = new Date(date).getDate();
    const year = new Date(date).getFullYear();

    if (new Date().getDate() - day === 1) return "Yesterday";
    if (new Date().getDate() - day === 2) return "2 days ago";
    if (new Date().getDate() - day === 3) return "3 days ago";
    if (new Date().getDate() - day === 4) return "4 days ago";
    if (new Date().getDate() - day === 5) return "5 days ago";
    if (new Date().getDate() - day === 6) return "6 days ago";
    if (new Date().getDate() - day === 0) return "Today";
    if (new Date().getDate() - day >= 7) return "A week ago";
    if (new Date().getDate() - day >= 14) return "2 weeks ago";
    if (new Date().getDate() - day >= 21) return "3 weeks ago";
    if (new Date().getDate() - day >= 28) return "a month ago";

    const monthInEnglish = [
      "Jan",
      "Feb",
      "March",
      "April",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = new Date(date).getMonth();

    const month = monthInEnglish[monthIndex];

    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">Your Ideas</h2>

          {/* Display error if any */}
          {error && (
            <div className="text-center text-red-600">
              <p>{error}</p>
            </div>
          )}

          {/* Display message when no ideas are available */}
          {!error && ideasList.length === 0 && (
            <p className="text-center">You don't have any ideas yet</p>
          )}

          {/* Display ideas when available */}
          {ideasList.length > 0 && (
            <>
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 py-4 px-6 rounded-full items-center gap-2 w-full ">
                  <input
                    type="text"
                    className="w-full"
                    placeholder="Search for all your ideas"
                  />
                  <SearchNormal className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-3 rounded-full cursor-pointer hover:bg-gray-200">
                    <LayoutGrid className="h-6 w-6" />
                  </div>
                  <div className="p-3 rounded-full cursor-pointer hover:bg-gray-200">
                    <LayoutList className="h-6 w-6" />
                  </div>
                </div>
              </div>
              <div className="my-2">
                <div className="grid  2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-6 gap-8 items-start">
                  {ideasList.map((idea, index) => (
                    <div key={index} className="grid gap-2">
                      <div className="h-[150px] w-full cursor-pointer rounded-xl hover:bg-gray-300 bg-gray-200"></div>
                      <div>
                        <h2 className="font-bold text-xl">{idea.title}</h2>
                        <p className="">
                          {idea.description.length > 50
                            ? `${idea.description.substring(0, 50)}...`
                            : idea.description}
                        </p>
                      </div>
                      <div className="flex text-sm text-gray-700 items-center justify-between">
                        <div className="flex items-center gap-1">
                          <LucideTarget className="h-5 w-5 text-black" />
                          <p className="capitalize">{idea.category}</p>
                        </div>
                        <p>{getDateInEnglish(idea.created_at)} </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ideas;
