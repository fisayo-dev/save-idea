import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";

const SingleIdea = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const getIdea = async () => {
    try {
      const response = await axiosInstance.post(`/ideas/${id}`, {
        creator_id: user,
      });
      const data = response.data;
      setIdea(data.idea);
      setError(null);
    } catch (err) {
      setIdea(null);
      setError(err.message || "An unknown error occurred");
    }
  };

  useEffect(() => {
    getIdea();
  }, []);

  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        {error && <div className="text-red-500">{error}</div>}
        {!error && !idea && <div className="text-blue-500">Loading...</div>}
        {!error && idea && (
          <div className="grid gap-6 p-2">
            <div className="grid gap-3">
              <label className="border-b text-sm ">Title</label>
              <h2 className="text-3xl font-bold">{idea.title}</h2>
            </div>
            <div className="grid gap-3">
              <label className="border-b text-sm ">Description</label>
              <h2 className="text-3xl">{idea.description}</h2>
            </div>
            <div className="grid gap-3">
              <label className="border-b text-sm ">Category</label>
              <h2 className="text-3xl">{idea.category}</h2>
            </div>
            <div className="grid gap-3">
              <label className="border-b text-sm ">Problem to solve</label>
              <h2 className="text-3xl">{idea.problem_to_solve}</h2>
            </div>
            <div className="grid gap-3">
              <label className="border-b text-sm ">Inspirational source</label>
              <h2 className="text-3xl">{idea.inspiration_source}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleIdea;
