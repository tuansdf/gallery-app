import { ChangeEvent, useId } from "react";

import styles from "./upload-image.module.css";
import { CreateImageRequest } from "/src/features/images/image-types";
import { useCreateImageMutation } from "/src/features/images/stores/images-api-slice";

interface Props {
  albumId: string;
}

const UploadImage = ({ albumId }: Props) => {
  const inputId = useId();

  const [createImage, { isLoading: isUploading }] = useCreateImageMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;
    try {
      const data: CreateImageRequest = {
        image: imageFile,
        albumId,
      };
      createImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <input
        className={styles.hidden}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={isUploading}
      />
      <label htmlFor={inputId} className={styles["create-btn"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </label>
    </form>
  );
};

export default UploadImage;
