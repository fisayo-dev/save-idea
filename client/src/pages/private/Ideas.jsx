import { SearchNormal } from "iconsax-react";
import { LayoutGrid, LayoutList } from "lucide-react";

const Ideas = () => {
  const ideas = [
    {
      title: "Idea 1",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
    },
    {
      title: "Idea 2",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket.Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
    },
    {
      title: "Idea 3",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
    },
    {
      title: "Idea 4",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
    },
  ];
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
          <div className="my-2">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 items-start">
              {ideas.map((idea, index) => (
                <div key={index} className="grid  gap-2">
                  <div className="h-[150px] w-full  rounded-xl bg-gray-200"></div>
                  <div>
                    <h2 className="font-bold">{idea.title}</h2>
                    <p className="text-sm">
                      {idea.description.length > 50
                        ? `${idea.description.substring(0, 50)}...`
                        : idea.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
