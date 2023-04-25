import { Link } from "react-router-dom";
import styles from "./album-item.module.css";

interface Props {
  name: string;
  href: string;
}

const AlbumItem = ({ name, href }: Props) => {
  return (
    <Link className={styles.link} to={href}>
      <div className={styles.container}>
        <div className={styles.card}></div>

        <span>{name}</span>
      </div>
    </Link>
  );
};

export default AlbumItem;
