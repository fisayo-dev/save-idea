import { Input } from "../../components/ui/input";


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
              <Input type="text" placeholder="Give your idea a name" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIdea;
