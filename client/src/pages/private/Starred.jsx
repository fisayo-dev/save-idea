import { Refresh, SearchNormal } from "iconsax-react";
import { LayoutGrid, LayoutList, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";

import empty_ideas from "../../assets/vectors/empty_ideas.svg";
import error_fetching_ideas from "../../assets/vectors/error_fetching_ideas.svg";
import { Button } from "../../components/ui/button";
import { IdeaCard } from "../../components";

const Ideas = () => {
  const { user } = useAuth();
  const [ideasList, setIdeasList] = useState([]);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const fetchIdeas = async () => {
    setFetchLoading(true);
    try {
      const response = await axiosInstance.get(`/ideas/${user}/starred`);
      const data = response.data;
      setIdeasList(data.ideas);
      console.log(data.ideas);
      setError(null);
    } catch (err) {
      setIdeasList([]);
      setError(err.message || "An unknown error occurred");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">
            🌟 Your Starred Ideas
          </h2>

          {fetchLoading ? (
            <div className="grid p-2  min-h-[350px] bg-gray-50 w-full place-items-center rounded-2xl">
              <div className="">
                <Loader2Icon className="dark-color-yellow mx-auto w-28 h-28 animate-spin" />
                <p className="text-center">Loading</p>
              </div>
            </div>
          ) : (
            <>
              {/* Display error if any */}
              {error && (
                <div className="grid p-2  min-h-[350px] bg-gray-50 w-full place-items-center rounded-2xl">
                  <div className="flex flex-col items-center gap-5 ">
                    <img
                      src={error_fetching_ideas}
                      draggable={false}
                      className="mx-auto w-56"
                    />
                    <p className="text-center">
                      An error occurred when trying to fetch ideas
                    </p>
                    <div className="mx-auto" onClick={fetchIdeas()}>
                      <Button className="flex items-center gap-2">
                        <Refresh className="h-6 w-6" />
                        <p>Re-fetch</p>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Display message when no ideas are available */}
              {!error && ideasList.length === 0 && (
                <div className="grid p-2  min-h-[350px] bg-gray-50 w-full place-items-center rounded-2xl">
                  <div className="flex flex-col items-center gap-5 ">
                    <img
                      src={empty_ideas}
                      draggable={false}
                      className="mx-auto w-52"
                    />
                    <p className="text-center">
                      You haven't starred any idea yet.
                    </p>
                  </div>
                </div>
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
                        <IdeaCard
                          key={index}
                          id={idea._id}
                          category={idea.category}
                          createDate={idea.created_at}
                          title={idea.title}
                          description={idea.description}
                          starredStatus={idea.starred}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ideas;
