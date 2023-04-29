import { Album } from "@/features/albums/types";
import { UserLogin } from "@/features/authentication/types";

export type Image = {
  id: string;
  name: string;
  imageUrl: string;
  album: Album;
  user: Omit<UserLogin, "token">;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateImageRequest = {
  albumId: string;
  image: File;
};
