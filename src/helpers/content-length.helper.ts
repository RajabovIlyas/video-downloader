import axios from "axios";

export const getContentLength = async (
  url?: string,
): Promise<number | undefined> => {
  try {
    if (!url) {
      return;
    }
    const res = await axios.get(url);
    const contentLength = res.headers["content-length"];
    if (!contentLength) {
      return;
    }
    return +contentLength;
  } catch (e) {}
  return;
};
