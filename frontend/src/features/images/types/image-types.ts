import { Album } from "@/features/albums/types/album-types";
import { User } from "@/features/authentication/types/auth-types";

export type Image = {
  id: string;
  name: string;
  imageUrl: string;
  album: Album;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};
