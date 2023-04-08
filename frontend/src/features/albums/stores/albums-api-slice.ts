import { apiSlice } from "/src/app/api-slice";
import { Album } from "/src/features/albums/types";

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlbums: builder.query<Album[], void>({
      query: () => ({
        url: "/albums/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAlbumsQuery } = albumsApiSlice;
