import { Loader2Icon } from "lucide-react";
import axiosInstance from "../../../axiosConfig";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateIdea = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [inspirationSource, setInspirationSource] = useState("");
  const [problemToSolve, setProblemToSolve] = useState("");

  // State for field errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    inspirationSource: "",
    problemToSolve: "",
  });

  // Validation function
  const validateFields = () => {
    const newErrors = {
      title: "",
      description: "",
      category: "",
      inspirationSource: "",
      problemToSolve: "",
    };

    let isValid = true;

    // Check if fields are empty
    if (!title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters.";
      isValid = false;
    }
    if (!category.trim()) {
      newErrors.category = "Category is required.";
      isValid = false;
    } else if (category.length < 3) {
      newErrors.category = "Category must contain at 3 letters.";
      isValid = false;
    }
    if (!inspirationSource.trim()) {
      newErrors.inspirationSource = "Inspiration source is required.";
      isValid = false;
    } else if (inspirationSource.length < 20) {
      newErrors.inspirationSource =
        "Inspiration source must be at least 20 characters.";
      isValid = false;
    }
    if (!problemToSolve.trim()) {
      newErrors.problemToSolve = "Problem to solve is required.";
      isValid = false;
    } else if (problemToSolve.length < 20) {
      newErrors.problemToSolve =
        "Problem to solve must be at least 20 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createNewIdea = async (e) => {
    e.preventDefault();

    if (!validateFields()) {    
      return;
    }

    setCreateLoading(true);
    try {
      const response = await axiosInstance.post("/ideas", {
        title,
        description,
        category,
        inspiration_source: inspirationSource,
        problem_to_solve: problemToSolve,
        creator_id: user,
      });
      const id = response.data.createdIdea._id;
      navigate(`/ideas/${id}`);
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
          {createError && (
                <p className="bg-red-500 px-3 py-4 text-sm">{createError}</p>
              )}
            {/* Title Field */}
            <div className="grid gap-3">
              <label>Title</label>
              <Input
                type="text"
                placeholder="Give your idea a name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="grid gap-3">
              <label>Description</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="Tell us more about your idea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Category Field */}
            <div className="grid gap-3">
              <label>Category</label>
              <Input
                type="text"
                placeholder="What category does your idea belong to?"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* Inspiration Source Field */}
            <div className="grid gap-3">
              <label>Inspiration source</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="Where did you get this brilliant idea from?"
                onChange={(e) => setInspirationSource(e.target.value)}
                value={inspirationSource}
              />
              {errors.inspirationSource && (
                <p className="text-red-500 text-sm">{errors.inspirationSource}</p>
              )}
            </div>

            {/* Problem to Solve Field */}
            <div className="grid gap-3">
              <label>Problem to be solved</label>
              <Textarea
                type="text"
                className="h-52"
                placeholder="What problem do you think this idea will be solving?"
                onChange={(e) => setProblemToSolve(e.target.value)}
                value={problemToSolve}
              />
              {errors.problemToSolve && (
                <p className="text-red-500 text-sm">{errors.problemToSolve}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mx-auto my-5">
              <Button
                disabled={createLoading}
                className="flex items-center gap-2"
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