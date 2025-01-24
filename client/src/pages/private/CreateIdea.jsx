import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";


const CreateIdea = () => {
  return (
    <div className="2xl:container mx-auto">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">
            What's on your mind today 🤔
          </h2>
          <form className="grid gap-3">
            <div className="grid gap-3">
              <label>Title</label>
              <Input type="text" placeholder="Give your idea a name" />
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
            <div>
              <Button>Create the idea</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
