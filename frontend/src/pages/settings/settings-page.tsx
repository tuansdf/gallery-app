import { useSelector } from "react-redux";
import styles from "./settings-page.module.css";
import ChangePasswordForm from "/src/features/authentication/components/change-password-form/change-password-form";
import { selectCurrentUser } from "/src/features/authentication/stores/auth-slice";

const SettingsPage = () => {
  const user = useSelector(selectCurrentUser);

  const email = user?.email || "";

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Account</h1>
      <ChangePasswordForm email={email} />
    </main>
  );
};

export default SettingsPage;
