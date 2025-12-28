import { createBrowserRouter, Router } from "react-router-dom";
import App from "../App";
import ViewSnip from "../features/Snip/components/ViewSnip";
import Home from "../features/Snip/components/Home";
import Snips from "../features/Snip/components/Snips";
import { ROUTES } from "../constants/routes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.snips,
        element: <Snips />,
      },
      {
        path: ROUTES.viewSnip,
        element: <ViewSnip />,
      },
    ],
  },
]);
