import styles from "./album-item.module.css";

interface Props {
  name: string;
}

const AlbumItem = ({ name }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}></div>

      <span>{name}</span>
    </div>
  );
};

export default AlbumItem;
