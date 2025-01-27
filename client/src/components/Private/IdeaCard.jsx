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
}) => {
  return (
    <Link  className="grid gap-2">
      <div className="h-[150px] w-full cursor-pointer rounded-xl hover:bg-gray-300 bg-gray-200"></div>
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
        <div onClick={starIdeaFunc} className={starredStatus && "bg-yellow"}>
          <Star1 />
        </div>
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
        <p>{getDateInEnglish(createDate)} </p>
      </div>
    </Link>
  );
};

export default IdeaCard;
