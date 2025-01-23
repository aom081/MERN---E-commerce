import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/Main";
import Home from "../page/Home/Home";
import Shop from "../page/Shop/Index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
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
    ],
  },
]);
export default router;
