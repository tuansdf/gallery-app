import { useDispatch, useSelector } from "react-redux";
import styles from "./settings-page.module.css";
import ChangePasswordForm from "/src/features/authentication/components/change-password-form/change-password-form";
import {
  logout,
  selectCurrentUser,
} from "/src/features/authentication/stores/auth-slice";
import Button from "/src/features/ui/button/button";

const SettingsPage = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const email = user?.email || "";

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Account</h1>
      <ChangePasswordForm email={email} />
      <Button onClick={() => dispatch(logout(""))}>Log out</Button>
    </main>
  );
};

export default SettingsPage;
