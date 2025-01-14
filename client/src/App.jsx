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
  VoltPage
} from "./pages";
import AppOutlet from "./outlets/AppOutlet";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/whiteboard/board" element={<Board />} />
          <Route path="" element={<AppOutlet />}>
            <Route path="/volt" element={<VoltPage />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
