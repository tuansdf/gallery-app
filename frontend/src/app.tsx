import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@/app/store";
import RequireAuth from "@/features/authentication/components/require-auth";
import RequireNotAuth from "@/features/authentication/components/require-not-auth";
import AlbumPage from "@/pages/album/album-page";
import IndexLayout from "@/pages/index/index-layout";
import IndexPage from "@/pages/index/index-page";
import NotFoundPage from "@/pages/not-found/not-found-page";
import SettingsPage from "@/pages/settings/settings-page";
import ForgotPasswordPage from "@/pages/sign-in/forgot-password-page";
import ResetPasswordPage from "@/pages/sign-in/reset-password-page";
import SignInLayout from "@/pages/sign-in/sign-in-layout";
import SignInPage from "@/pages/sign-in/sign-in-page";
import SignUpPage from "@/pages/sign-up/sign-up-page";
import VerifyEmailPage from "@/pages/verify-email/verify-email-page";
import { domAnimation, LazyMotion } from "framer-motion";

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
          {
            path: "/verify-email",
            element: <VerifyEmailPage />,
          },
        ],
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <IndexLayout />,
        children: [
          {
            index: true,
            element: <IndexPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/albums/:albumId",
            element: <AlbumPage />,
          },
        ],
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
        <LazyMotion features={domAnimation}>
          <RouterProvider router={router}></RouterProvider>
        </LazyMotion>
      </PersistGate>
    </Provider>
  );
}

export default App;
