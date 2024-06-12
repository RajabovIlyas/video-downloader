import axios from "axios";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";

export const getContentLength = async (
  url: string,
): Promise<number | undefined> => {
  const res = await axios.get(url);
  const contentLength = res.headers["content-length"];
  if (!contentLength) {
    return;
  }
  return +contentLength;
};
