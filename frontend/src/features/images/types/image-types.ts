import { Album } from "@/features/albums/types";
import { User } from "@/features/authentication/api/login";

export type Image = {
  id: string;
  name: string;
  imageUrl: string;
  album: Album;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateImageRequest = {
  albumId: string;
  image: File;
};
