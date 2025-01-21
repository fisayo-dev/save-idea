import { SearchNormal } from "iconsax-react";
import { LayoutGrid, LayoutList } from "lucide-react";

const Ideas = () => {
  return (
    <div className="app-container">
      <div className="py-6">
        <div className="grid gap-4">
          <h2 className="text-4xl font-bold text-center">Your Ideas</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Ideas;
