import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  Signup,
  Login,
  PageNotFound,
  Ideas,
  Landing,
  Profile,
} from "./pages";
import AppOutlet from "./outlets/AppOutlet";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="" element={<AppOutlet />}>
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
