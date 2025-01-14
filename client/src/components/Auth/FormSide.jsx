import landing_image from "../../assets/vectors/landing_blub.png";
const FormSide = ({ children, formImagePosition }) => {
  return (
    <div className="grid grid-cols-2 overflow-hidden">
      {formImagePosition == "left" && (
        <div className="bg-yellow-100 h-[100vh]">
          <div className="grid place-items-center h-full">
            <img src={landing_image} className="h-[500px] w-[500px]" alt="" />
          </div>
        </div>
      )}
      <div className="h-[100vh]">
        <div className="flex flex-col justify-center h-full p-2  gap-8">
          {children}
        </div>
      </div>
      {formImagePosition == "right" && (
        <div className="bg-yellow-100 h-[100vh]">
          <div className="grid place-items-center h-full">
            <img src={landing_image} className="h-[500px] w-[500px]" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSide;
