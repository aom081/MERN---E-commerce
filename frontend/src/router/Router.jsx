import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/Main";
import Home from "../page/Home/Home";
import Shop from "../page/Shop/index";

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
        element: <cart />,
      },
    ],
  },
]);

export default router;
