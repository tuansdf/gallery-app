import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "/src/app/store";
import RequireAuth from "/src/features/authentication/components/require-auth";
import RequireNotAuth from "/src/features/authentication/components/require-not-auth";
import Homepage from "/src/pages/homepage/homepage";
import NotFoundPage from "/src/pages/not-found/not-found-page";
import ForgotPasswordPage from "/src/pages/sign-in/forgot-password-page";
import ResetPasswordPage from "/src/pages/sign-in/reset-password-page";
import SignInLayout from "/src/pages/sign-in/sign-in-layout";
import SignInPage from "/src/pages/sign-in/sign-in-page";
import SignUpPage from "/src/pages/sign-up/sign-up-page";

const router = createBrowserRouter([
  {
    element: <RequireNotAuth />,
    children: [
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        element: <SignInLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SignInPage />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPasswordPage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
