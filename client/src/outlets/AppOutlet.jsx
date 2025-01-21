import { Outlet } from "react-router-dom";
import { Sidebar, SidebarResponsive } from "../components";
import { Message, MessageQuestion } from "iconsax-react";
import { BellIcon, MenuIcon } from "lucide-react";
import { useState } from "react";

const AppOutlet = () => {
  const [turnMenuOn, setTurnMenuOn] = useState(false);
  return (
    <div className={`relative w-[100vw] block md:flex `}>
      <div
        className={`bg-gray-600 md:hidden bg-opacity-60 z-30 absolute h-[100vh] w-[100vw] ${
          turnMenuOn ? "block" : "hidden"
        }`}
        onClick={() => setTurnMenuOn(false)}
      />
      <div
        className={`${
          turnMenuOn ? "block" : "hidden"
        } z-40  absolute  top-0 left-0 h-full`}
      >
        <SidebarResponsive />
      </div>
      <Sidebar />
      <div className="px-6 mx-auto 2xl:w-[70vw] sm:w-[80vw] w-full">
        <div className="w-full grid">
          <div className="md:px-6 w-full top-0 h-[10vh] py-5 grid items-center">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div
                  className="block xl:hidden p-2 hover:bg-gray-200 rounded-full cursor-pointer"
                  onClick={() => setTurnMenuOn(true)}
                >
                  <MenuIcon className="h-7 w-7" />
                </div>
                <MessageQuestion className="h-6 w-6 text-gray-600" />
                <p className="hidden md:block">Whats on your mind today?</p>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <BellIcon className="h-6 w-6" />
                <Message className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="px-2 md:px-8 h-[90vh] overflow-scroll ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppOutlet;
