import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/Main";
import Home from "../page/Home/Home";
import Shop from "../page/Shop/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Setting from "../page/Setting/updateProfile";
import ProfileIndex from "../page/Profile/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/updateProfile",
        element: <Setting />,
      },
      {
        path: "/ProfileIndex",
        element: <ProfileIndex />,
      },
    ],
  },
]);
export default router;
