import { Link } from "react-router-dom";

import classes from "./album-item.module.css";

interface Props {
  name: string;
  href: string;
  imageUrl?: string;
}

const AlbumItem = ({ name, href, imageUrl }: Props) => {
  return (
    <Link className={classes["link"]} to={href}>
      <div className={classes["card"]}>
        {imageUrl ? (
          <img
            src={imageUrl}
            className={classes["img"]}
            loading="lazy"
            alt={`Cover image of album ${name}`}
          ></img>
        ) : (
          <div className={classes["img"]}></div>
        )}
        <div className={classes["name"]}>{name}</div>
      </div>
    </Link>
  );
};

export default AlbumItem;
