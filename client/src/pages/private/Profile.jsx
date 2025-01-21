const Profile = () => {
  return (
    <div className="app-container">
      <div className="my-10">
        <div className="grid gap-4">
          <div className="rounded-xl p-4 border-2 border-gray-400 bg-gray-100">
            <div className="grid md:flex items-center gap-6">
              <div className="md:mx-0 mx-auto h-28 w-28 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-1 md:items-start items-center ">
                <h2 className="font-bold text-2xl">Fisayo Obadina</h2>
                <p className="">olufisayobadina@gmail.com</p>
                <p className="text-sm">Joined Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
