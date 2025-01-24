import { Loader2Icon } from "lucide-react";
import axiosInstance from "../../../axiosConfig";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const CreateIdea = () => {
  const { user } = useAuth();

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inspirationSource, setInspirationSource] = useState("");
  const [problemToSolve, setProblemToSolve] = useState("");

  const createNewIdea = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      // Make a POST request to the server to create a new idea
      await axiosInstance.post("/ideas", {
        title,
        description,
        category,
        inspiration_source: inspirationSource,
        problem_to_solve: problemToSolve,
        creator_id: user,
      });
      alert('Idea creation successful')
    } catch (error) {
      setCreateError(error);
    } finally {
      setCreateLoading(false);
    }
  };
  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">
            What&apos;s on your mind today 🤔
          </h2>
          <form onSubmit={createNewIdea} className="grid gap-3">
            <div className="grid gap-3">
              <label>Title</label>
              <Input
                type="text"
                placeholder="Give your idea a name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="grid gap-3">
              <label>Description</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="Tell us more about your idea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="grid gap-3">
              <label>Category</label>
              <Textarea
                type="text"
                placeholder="What category does your idea belong to?"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>
            <div className="grid gap-3">
              <label>Inspiration source</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="Where did you get this brilliant idea from?"
                onChange={(e) => setInspirationSource(e.target.value)}
                value={inspirationSource}
              />
            </div>
            <div className="grid gap-3">
              <label>Problem to be solved</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="What problem do you think this idea will be solving?"
                onChange={(e) => setProblemToSolve(e.target.value)}
                value={problemToSolve}
              />
            </div>
            <div className="mx-auto my-5">
              <Button
                disabled={createLoading}
                className="flex items-center gap-"
              >
                {createLoading && <Loader2Icon className="animate-spin" />}
                <p>{createLoading ? "Creating idea" : "Create the idea"}</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
