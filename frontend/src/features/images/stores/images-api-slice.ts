import { apiSlice } from "/src/app/api-slice";
import { CreateImageRequest, Image } from "/src/features/images/image-types";

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query<Image[], String>({
      query: (albumId) => ({
        url: `/images?albumId=${albumId}`,
        method: "GET",
      }),
      providesTags: ["Image"],
    }),
    createImage: builder.mutation<Image, CreateImageRequest>({
      query: (data) => {
        const form = new FormData();
        form.append("image", data.image);
        form.append("albumId", data.albumId);
        return {
          url: "/images",
          method: "POST",
          body: form,
          prepareHeaders: (headers: Headers) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers;
          },
        };
      },
      invalidatesTags: ["Image"],
    }),
  }),
});

export const { useGetImagesQuery, useCreateImageMutation } = albumsApiSlice;
