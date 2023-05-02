import { Link } from "react-router-dom";

import classes from "./not-found-page.module.css";

const NotFoundPage = () => {
  return (
    <main className={classes["main"]}>
      <h1 className={classes["heading"]}>Page not found</h1>
      <div className={classes["navigation"]}>
        Back to <Link to="/">home</Link>.
      </div>
    </main>
  );
};

export default NotFoundPage;
