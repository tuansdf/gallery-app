import { useEffect } from "react";

import ChangePasswordForm from "@/features/authentication/components/change-password-form/change-password-form";
import { useAuthUser } from "@/features/authentication/stores/auth-store";
import { useAppBarActions } from "@/features/menu/stores/app-bar-store";
import classes from "./settings-page.module.css";

const SettingsPage = () => {
  const authUser = useAuthUser();
  const { setAppBarTitle } = useAppBarActions();

  const userEmail = authUser?.email || "";

  useEffect(() => {
    setAppBarTitle("Settings");
  }, []);

  return (
    <main className={classes["main"]}>
      <section>
        <h2 className={classes["section-title"]}>Account</h2>
        <ChangePasswordForm email={userEmail} />
      </section>
    </main>
  );
};

export default SettingsPage;
