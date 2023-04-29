import { apiSlice } from "@/app/api-slice";
import { Album, CreateAlbumRequest } from "@/features/albums/types";

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], void>({
      query: () => ({
        url: "/albums",
        method: "GET",
      }),
      providesTags: ["Album"],
    }),
    createAlbum: builder.mutation<Album, CreateAlbumRequest>({
      query: (data) => ({
        url: "/albums",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Album"],
    }),
    getAlbum: builder.query<Album, String>({
      query: (albumId) => ({
        url: `/albums/${albumId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAlbumsQuery, useGetAlbumQuery, useCreateAlbumMutation } =
  albumsApiSlice;
