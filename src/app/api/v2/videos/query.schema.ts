import { z } from "zod";

export const querySchema = z.object({
  id: z.string().min(1),
  quality: z.string().min(1),
});

export const checkPrams = (url: string) => {
  const { searchParams } = new URL(url);
  const id = searchParams.get("id");
  const quality = searchParams.get("quality");
  return querySchema.parse({ id: id as string, quality: quality as string });
};
