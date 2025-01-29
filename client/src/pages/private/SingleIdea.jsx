import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Back, Trash } from "iconsax-react";
import { Loader2Icon, Pencil, XCircle } from "lucide-react";

const SingleIdea = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editIdeaMode, setEditIdeaMode] = useState(false);
  const navigate = useNavigate();

  // State for editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inspirationSource, setInspirationSource] = useState("");
  const [problemToSolve, setProblemToSolve] = useState("");

  // Fetch the idea
  const getIdea = async () => {
    try {
      const response = await axiosInstance.get(`/ideas/${id}/creator/${user}`);
      const data = response.data;
      setIdea(data.idea);

      // Initialize editable fields with the fetched idea data
      setTitle(data.idea.title);
      setDescription(data.idea.description);
      setCategory(data.idea.category);
      setInspirationSource(data.idea.inspiration_source);
      setProblemToSolve(data.idea.problem_to_solve);

      setError(null);
    } catch (err) {
      setIdea(null);
      setError(err.message || "An unknown error occurred");
    }
  };

  // Edit the idea
  const editIdea = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      await axiosInstance.put(`/ideas/${id}`, {
        title,
        description,
        category,
        inspiration_source: inspirationSource,
        problem_to_solve: problemToSolve,
        creator_id: user,
      });

      // Redirect to the single idea page after successful edit
      setEditIdeaMode(false);
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete the idea
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
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteToBin = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.put(`/ideas/${id}/creator/${user}`)
      navigate('/bin')
    } catch (err) {
      console.log(err)
    }
  }

  // Fetch the idea when the component mounts
  useEffect(() => {
    getIdea();
  }, [id]);

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
                {editIdeaMode ? (
                  <div
                    className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                    onClick={() => setEditIdeaMode(false)}
                  >
                    <XCircle />
                  </div>
                ) : (
                  <div
                    className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                    onClick={() => setEditIdeaMode(true)}
                  >
                    <Pencil />
                  </div>
                )}
                <div
                  className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                  onClick={deleteToBin}
                >
                  <Trash />
                </div>
              </div>
            </div>
            <div className="grid gap-6 p-2">
              {/* Title */}
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm">Title</label>
                {editIdeaMode ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4 py-2 border-[.101rem] border-gray-600 rounded-2xl"
                  />
                ) : (
                  <h2 className="text-3xl font-bold">{title}</h2>
                )}
              </div>

              {/* Description */}
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm">Description</label>
                {editIdeaMode ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-4 py-2 border-[.101rem] border-gray-600 rounded-2xl"
                  />
                ) : (
                  <p>{description}</p>
                )}
              </div>

              {/* Category */}
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm">Category</label>
                {editIdeaMode ? (
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border-[.101rem] border-gray-600 rounded-2xl"
                  />
                ) : (
                  <p>{category}</p>
                )}
              </div>

              {/* Problem to Solve */}
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm">Problem to solve</label>
                {editIdeaMode ? (
                  <textarea
                    value={problemToSolve}
                    onChange={(e) => setProblemToSolve(e.target.value)}
                    className="min-h-[350px] px-4 py-2 border-[.101rem] border-gray-600 rounded-2xl"
                  />
                ) : (
                  <textarea
                    readOnly
                    className="min-h-[350px] px-4 py-2 rounded-2xl"
                  >
                    {problemToSolve}
                  </textarea>
                )}
              </div>

              {/* Inspiration Source */}
              <div className="grid gap-2 p-4 rounded-xl bg-gray-200">
                <label className="text-sm">Inspirational source</label>
                {editIdeaMode ? (
                  <textarea
                    value={inspirationSource}
                    onChange={(e) => setInspirationSource(e.target.value)}
                    className="min-h-[350px] px-4 py-2 border-[.101rem] border-gray-600 rounded-2xl"
                  />
                ) : (
                  <textarea
                    readOnly
                    className="min-h-[350px] px-4 py-2 rounded-2xl"
                  >
                    {inspirationSource}
                  </textarea>
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            {editIdeaMode && (
              <div className="mx-auto">
                <Button
                  onClick={editIdea}
                  disabled={editLoading}
                  className="flex items-center gap-2"
                >
                  {editLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <Pencil />
                  )}
                  <p>{editLoading ? "Saving changes" : "Save changes"}</p>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleIdea;
