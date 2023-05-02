import { useSelector } from "react-redux";

import ChangePasswordForm from "@/features/authentication/components/change-password-form/change-password-form";
import { selectCurrentUser } from "@/features/authentication/stores/auth-slice";
import classes from "./settings-page.module.css";

const SettingsPage = () => {
  const user = useSelector(selectCurrentUser);

  const email = user?.email || "";

  return (
    <main className={classes["main"]}>
      <h1 className={classes["heading"]}>Account</h1>
      <ChangePasswordForm email={email} />
    </main>
  );
};

export default SettingsPage;
