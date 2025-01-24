import { Loader2Icon } from "lucide-react";
import axiosInstance from "../../../axiosConfig";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useState } from "react";


const CreateIdea = () => {
  const [createLoading, setCreateLoading] = useState(true)
  const [createError, setCreateError] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [inspirationSource, setInspirationSource] = useState('')
  const [problemToSolve, setProblemToSolve] = useState('')


  const createIdea = async () => {
    setCreateLoading(true)
    try {
      // Make a POST request to the server to create a new idea
      const response = await axiosInstance.post('/ideas', {

      })
    } catch (error) {
      setCreateError(error)
    } finally {
      setCreateLoading(false)
    }

  }
  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">
            What&apos;s on your mind today 🤔
          </h2>
          <form className="grid gap-3">
            <div className="grid gap-3">
              <label>Title</label>
              <Input type="text" placeholder="Give your idea a name" value={title} />
            </div>
            <div className="grid gap-3">
              <label>Description</label>
              <Textarea type="text" className="h-52" placeholder="Tell us more about your idea" />
            </div>
            <div className="grid gap-3">
              <label>Category</label>
              <Textarea type="text" placeholder="Give your idea a name" />
            </div>
            <div className="grid gap-3">
              <label>Inspiration source</label>
              <Textarea type="text" className="h-52" placeholder="Where did you get this brilliant idea from?" />
            </div>
            <div className="grid gap-3">
              <label>Problem to be solved</label>
              <Textarea type="text" className="h-52" placeholder="What problem do you think this idea will be solving?" />
            </div>
            <div className="mx-auto my-5">
              <Button disabled={createLoading} className="flex items-center gap-">
                {createLoading && <Loader2Icon className="animate-spin" />}
                <p>{createLoading ? 'Creating idea': 'Create the idea'}</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
