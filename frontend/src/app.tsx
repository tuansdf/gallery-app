import { RouterProvider, createBrowserRouter } from "react-router-dom";

import NotFoundPage from "/src/pages/not-found/not-found-page";
import SignInPage from "/src/pages/sign-in/sign-in-page";
import SignUpPage from "/src/pages/sign-up/sign-up-page";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
