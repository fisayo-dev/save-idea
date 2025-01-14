import landing_image from "../../assets/vectors/landing_blub.png";
const FormSide = ({ children }) => {
  return (
    <div className="grid grid-cols-2 overflow-hidden">
      <div className="bg-yellow-100 h-[100vh]">
        <div className="grid place-items-center h-full">
          <img src={landing_image} className="h-[500px] w-[500px]" alt="" />
        </div>
      </div>
      <div className="h-[100vh]">
        <div className="grid place-items-center h-full">{children}</div>
      </div>
    </div>
  );
};

export default FormSide;
