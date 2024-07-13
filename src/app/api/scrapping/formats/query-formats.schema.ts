import { z } from "zod";

const queryFormatsSchema = z.object({
  id: z.string().min(1),
});

export const checkFormatsPrams = (url: string) => {
  const { searchParams } = new URL(url);
  return queryFormatsSchema.parse({
    id: searchParams.get("id"),
  });
};
