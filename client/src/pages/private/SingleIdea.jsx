import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Back, Refresh, Trash } from "iconsax-react";
import { Loader2Icon, Pencil, XCircle } from "lucide-react";

const SingleIdea = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [idea, setIdea] = useState(null);
  const [error, setError] = useState(null);
  const [editIdeaMode, setEditIdeaMode] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inspirationSource, setInspirationSource] = useState("");
  const [problemToSolve, setProblemToSolve] = useState("");
  const [deleteDate, setDeleteDate] = useState(null);

  /** Fetch the idea */
  const getIdea = async () => {
    try {
      const response = await axiosInstance.get(`/ideas/${id}/creator/${user}`);
      const data = response.data.idea;

      setIdea(data);
      setDeleteDate(data.deleted_at);
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
      setInspirationSource(data.inspiration_source);
      setProblemToSolve(data.problem_to_solve);

      setError(null);
    } catch (err) {
      setIdea(null);
      setError(err.message || "An error occurred while fetching the idea.");
    }
  };

  /** Edit the idea */
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
      setEditIdeaMode(false);
      getIdea(); // Refresh data after update
    } catch (err) {
      setError(err.message || "An error occurred while updating the idea.");
    } finally {
      setEditLoading(false);
    }
  };

  /** Move the idea to bin */
  const deleteToBin = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/ideas/${id}/bin`, { creator_id: user });
      navigate("/bin");
    } catch (err) {
      setError(err.message || "Failed to move idea to bin.");
    }
  };

  const restoreFromBin = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/ideas/${id}/restore`, { creator_id: user });
      navigate("/ideas");
    } catch (err) {
      setError(err.message || "Failed to restore idea from bin.");
    }
  };
  /** Permanently delete the idea */
  const deleteIdea = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);

    try {
      await axiosInstance.delete(`/ideas/${id}`, {
        data: { creator_id: user },
      });
      navigate("/bin");
    } catch (err) {
      setError(err.message || "Failed to delete the idea.");
    } finally {
      setDeleteLoading(false);
    }
  };

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
            {/* Navigation and Controls */}
            <div className="flex items-center justify-between">
              <Link to={`${deleteDate == null ? "/ideas" : "/bin"}`}>
                <Button className="flex items-center gap-2">
                  <Back className="h-8 w-8" />
                  <p>Back</p>
                </Button>
              </Link>

              {/* Edit/Delete Controls */}
              <div className="flex items-center gap-2">
                {idea.deleted_at === null ? (
                  <>
                    {/* Toggle Edit Mode */}
                    {editIdeaMode ? (
                      <button
                        className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                        onClick={() => setEditIdeaMode(false)}
                      >
                        <XCircle />
                      </button>
                    ) : (
                      <button
                        className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                        onClick={() => setEditIdeaMode(true)}
                      >
                        <Pencil />
                      </button>
                    )}

                    {/* Move to Bin */}
                    <button
                      className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full p-3"
                      onClick={deleteToBin}
                    >
                      <Trash />
                    </button>
                  </>
                ) : (
                  <>
                    {/* Restore & Delete Permanently */}
                    <Button
                      className="flex items-center gap-2"
                      onClick={deleteIdea}
                      disabled={deleteLoading}
                    >
                      <Trash className="h-8 w-8" />
                      <p>
                        {deleteLoading ? "Deleting..." : "Delete Permanently"}
                      </p>
                    </Button>
                    <Button onClick={restoreFromBin} className="flex items-center gap-2">
                      <Refresh className="h-8 w-8" />
                      <p>Restore</p>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Idea Details */}
            <div className="grid gap-6 p-2">
              {[
                { label: "Title", value: title, setter: setTitle },
                {
                  label: "Description",
                  value: description,
                  setter: setDescription,
                },
                { label: "Category", value: category, setter: setCategory },
                {
                  label: "Problem to solve",
                  value: problemToSolve,
                  setter: setProblemToSolve,
                },
                {
                  label: "Inspirational source",
                  value: inspirationSource,
                  setter: setInspirationSource,
                },
              ].map(({ label, value, setter }) => (
                <div
                  key={label}
                  className="grid gap-2 p-4 rounded-xl bg-gray-200"
                >
                  <label className="text-sm">{label}</label>
                  {editIdeaMode ? (
                    <textarea
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="min-h-[100px] px-4 py-2 border border-gray-600 rounded-2xl"
                    />
                  ) : (
                    <p className="px-4 py-2">{value}</p>
                  )}
                </div>
              ))}
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
                  <p>{editLoading ? "Saving changes..." : "Save changes"}</p>
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
