import { apiSlice } from "/src/app/api-slice";
import { Album, CreateAlbumRequest } from "/src/features/albums/types";

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAlbums: builder.query<Album[], void>({
      query: () => ({
        url: "/albums/",
        method: "GET",
      }),
      providesTags: ["Album"],
    }),
    createAlbum: builder.mutation<Album, CreateAlbumRequest>({
      query: (data: CreateAlbumRequest) => ({
        url: "/albums/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Album"],
    }),
  }),
});

export const { useGetAllAlbumsQuery, useCreateAlbumMutation } = albumsApiSlice;
