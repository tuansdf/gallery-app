export type Album = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAlbumRequest = {
  name: string
}