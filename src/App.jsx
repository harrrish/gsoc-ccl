import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NA from "./Pages/NA";
import Home from "./Pages/Home";
import LATAM from "./Pages/LATAM";
import Europe from "./Pages/Europe";
import AMET from "./Pages/AMET";
import APAC from "./Pages/APAC";
import Error from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/NA",
    element: <NA />,
  },
  {
    path: "/LATAM",
    element: <LATAM />,
  },
  {
    path: "/Europe",
    element: <Europe />,
  },
  {
    path: "/AMET",
    element: <AMET />,
  },
  {
    path: "/APAC",
    element: <APAC />,
  },
  {
    path: "/*",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
