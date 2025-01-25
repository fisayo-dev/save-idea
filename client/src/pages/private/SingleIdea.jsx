import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Back, Trash } from "iconsax-react";
import { Pencil } from "lucide-react";

const SingleIdea = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const getIdea = async () => {
    try {
      const response = await axiosInstance.get(`/ideas/${id}/creator/${user}`);
      const data = response.data;
      setIdea(data.idea);
      setError(null);
    } catch (err) {
      setIdea(null);
      setError(err.message || "An unknown error occurred");
    }
  };

  const deleteIdea = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`/ideas/${id}`, {
        data: { creator_id: user },
      });
      setError(null);
      setIdea(null);
      navigate("/ideas");
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    }
    setDeleteLoading(false);
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
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Link to="/ideas">
                <Button className="flex items-center gap-2">
                  <Back className="h-8 w-8" />
                  <p>Back</p>
                </Button>
              </Link>
              {deleteLoading && (
                <div className="bg-gray-200 rounded-full px-4 py-2 cursor-not-allowed opacity-70">
                  Deleting idea...
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3">
                  <Pencil />
                </div>
                <div
                  className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                  onClick={deleteIdea}
                >
                  <Trash />
                </div>
              </div>
            </div>
            <div className="grid gap-6 p-2">
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm ">Title</label>
                <h2 className="text-3xl font-bold">{idea.title}</h2>
              </div>
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm ">Description</label>
                <p>{idea.description}</p>
              </div>
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm ">Category</label>
                <p>{idea.category}</p>
              </div>
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm ">Problem to solve</label>
                <p>{idea.problem_to_solve}</p>
              </div>
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm ">Inspirational source</label>
                <p>{idea.inspiration_source}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleIdea;
