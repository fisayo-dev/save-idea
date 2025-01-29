import { Link } from "react-router-dom";
import { Star1 } from "iconsax-react";
import { LucideTarget } from "lucide-react";
import getDateInEnglish from "../../utils/dateFormatter";

const IdeaCard = ({
  id,
  title,
  description,
  createDate,
  category,
  starredStatus,
  starIdeaFunc,
  deletedDate,
  type,
}) => {
  return (
    <div className="grid gap-2">
      <Link
        to={`${type == "bin" ? `/bin/${id}` : `/ideas/${id}`}`}
        className="h-[150px] w-full cursor-pointer rounded-xl hover:bg-gray-300 bg-gray-200"
      ></Link>
      <div className="flex items-center justify-between ">
        <div>
          <h2 className="font-bold text-xl">
            {" "}
            {title.length > 13 ? `${title.substring(0, 13)}...` : title}
          </h2>
          <p className="overflow-x-hidden">
            {description.length > 30
              ? `${description.substring(0, 30)}...`
              : description}
          </p>
        </div>
        {type !== "bin" && (
          <div
            onClick={starIdeaFunc}
            className={`cursor-pointer ${starredStatus && "color-yellow"}`}
          >
            <Star1 />
          </div>
        )}
      </div>
      <div className="flex text-sm text-gray-700 items-center justify-between">
        <div className="flex items-center gap-1">
          <LucideTarget className="h-5 w-5 text-black" />
          <p className="capitalize">
            {" "}
            {category.length > 15
              ? `${category.substring(0, 15)}...`
              : category}
          </p>
        </div>
        <p>
          {type === "bin"
            ? isNaN(new Date(deletedDate))
              ? "Invalid date"
              : `${Math.max(
                  0,
                  Math.floor(
                    (new Date(deletedDate) - new Date()) / (1000 * 60 * 60 * 24)
                  )
                )} days left`
            : getDateInEnglish(createDate)}
        </p>
      </div>
    </div>
  );
};

export default IdeaCard;
