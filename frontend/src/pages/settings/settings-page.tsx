import { useSelector } from "react-redux";
import styles from "./settings-page.module.css";
import ChangePasswordForm from "/src/features/authentication/components/change-password-form/change-password-form";
import { selectCurrentUser } from "/src/features/authentication/stores/auth-slice";
import Button from "/src/features/ui/button/button";

const SettingsPage = () => {
  const user = useSelector(selectCurrentUser);

  const email = user?.email || "";

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Account</h1>
      <ChangePasswordForm email={email} />
      <Button>Log out</Button>
    </main>
  );
};

export default SettingsPage;
