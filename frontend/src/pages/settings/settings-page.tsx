import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChangePasswordForm from "@/features/authentication/components/change-password-form/change-password-form";
import { selectCurrentUser } from "@/features/authentication/stores/auth-slice";
import { setTitle } from "@/features/menu/stores/app-bar-store";
import classes from "./settings-page.module.css";

const SettingsPage = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const email = user?.email || "";

  useEffect(() => {
    dispatch(setTitle("Settings"));
  }, []);

  return (
    <main className={classes["main"]}>
      <section>
        <h2 className={classes["section-title"]}>Account</h2>
        <ChangePasswordForm email={email} />
      </section>
    </main>
  );
};

export default SettingsPage;
