import { z } from "zod";

export const queryVideosSchema = z.object({
  id: z.string().min(1),
  quality: z.string().min(1),
});

export const checkVideoPrams = (url: string) => {
  const { searchParams } = new URL(url);
  const id = searchParams.get("id");
  const quality = searchParams.get("quality");
  return queryVideosSchema.parse({
    id: id as string,
    quality: quality as string,
  });
};
