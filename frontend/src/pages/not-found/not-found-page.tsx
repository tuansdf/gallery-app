import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

const NotFoundPage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Page not found</h1>
      <div className={styles.navigation}>
        Back to <Link to="/">home</Link>.
      </div>
    </main>
  );
};

export default NotFoundPage;
