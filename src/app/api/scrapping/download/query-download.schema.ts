import { z } from "zod";
import { FormatFileType } from "@/server/scrapping-format/scrapping-format.interface";

const queryDownloadSchema = z.object({
  id: z.string().min(1),
  type: z.nativeEnum(FormatFileType),
  quality: z.string().min(1),
});

export const checkDownloadPrams = (url: string) => {
  const { searchParams } = new URL(url);
  return queryDownloadSchema.parse({
    id: searchParams.get("id"),
    type: searchParams.get("type"),
    quality: searchParams.get("quality"),
    fileName: searchParams.get("fileName"),
    token: searchParams.get("token"),
    timeExpire: searchParams.get("timeExpire"),
  });
};
