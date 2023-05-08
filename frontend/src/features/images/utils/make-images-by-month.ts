import dayjs from "dayjs";

import { Image } from "@/features/images/types/image-types";

type ImagesByMonth = {
  groupName: string;
  data: Image[];
};

export const makeImagesByMonth = (images: Image[]) => {
  const getMonthYear = (date: Date) => {
    return dayjs(date).format("MMMM YYYY");
  };

  if (!images.length) return;
  let currentGroupMonth = getMonthYear(images[0].createdAt);

  const result: ImagesByMonth[] = [];
  result.push({ groupName: currentGroupMonth, data: [] });

  for (const image of images) {
    const currentMonth = getMonthYear(image.createdAt);
    if (currentMonth !== currentGroupMonth) {
      currentGroupMonth = currentMonth;
      result.push({ groupName: currentGroupMonth, data: [] });
    }
    result[result.length - 1].data.push(image);
  }

  return result;
};
