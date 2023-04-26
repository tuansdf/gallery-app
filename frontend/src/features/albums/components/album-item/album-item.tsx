import { Link } from "react-router-dom";
import styles from "./album-item.module.css";

interface Props {
  name: string;
  href: string;
  imageUrl?: string;
}

const AlbumItem = ({ name, href, imageUrl }: Props) => {
  return (
    <Link className={styles.link} to={href}>
      <div className={styles.container}>
        {imageUrl ? (
          <img
            src={imageUrl}
            className={styles.card}
            loading="lazy"
            alt={`Cover image of album ${name}`}
          ></img>
        ) : (
          <div className={styles.card}></div>
        )}
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default AlbumItem;
