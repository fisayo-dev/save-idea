import { SearchNormal } from "iconsax-react";
import { LayoutGrid, LayoutList, LucideTarget } from "lucide-react";

const Ideas = () => {
  const ideas = [
    {
      title: "Idea 1",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
      status: 'Done',
    },
    {
      title: "Idea 2",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket.Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
      status: 'Still in progress',
    },
    {
      title: "Idea 3",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
      status: 'Almost done',
    },
    {
      title: "Idea 4",
      description:
        "Lorem ispum dor los sit aket. Lorem ispum dor los sit aket. Lorem ispum dor los sit aket ",
      date_created: "12/04/2024",
      img: "12",
      category: "science",
      status: 'unfinished',
    },
  ];
  return (
    <div className="2xl:container mx-auto">
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
            <div className="grid  2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-6 gap-8 items-start">
              {ideas.map((idea, index) => (
                <div key={index} className="grid gap-2">
                  <div className="h-[150px] w-full cursor-pointer rounded-xl hover:bg-gray-300 bg-gray-200"></div>
                  <div>
                    <h2 className="font-bold text-xl">{idea.title}</h2>
                    <p className="">
                      {idea.description.length > 50
                        ? `${idea.description.substring(0, 50)}...`
                        : idea.description}
                    </p>
                  </div>
                  <div className="flex text-sm text-gray-700 items-center justify-between">
                    <div className="flex items-center gap-1">
                      <LucideTarget className="h-5 w-5 text-black" />
                      <p className="capitalize">{idea.status}</p>
                    </div>
                    <p>{idea.date_created}</p>
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
