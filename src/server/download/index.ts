"use server";

import { getScrappingPage } from "@/server/scrapping-format";
import { getFormatFetch } from "@/server/scrapping-format/scrapping-format.fetch";
import { getFormatsByHTML } from "@/server/scrapping-format/scrapping-format.cheerio";
import {
  getDownloadVideoStatusFetch,
  getUrlForDownloadVideo,
} from "@/server/download/scrapping-video.fetch";

interface DownloadProps {
  id: string;
  type: string;
  quality: string;
}

export const getDownloadVideo = async ({
  id,
  type,
  quality,
}: DownloadProps) => {
  const clientTokenData = await getScrappingPage(id);

  const htmlFormatsString = await getFormatFetch({
    ...clientTokenData,
    videoId: id,
  });

  const formatsData = getFormatsByHTML(htmlFormatsString);

  const serverUrl = await getDownloadVideoStatusFetch({
    ...formatsData,
    id,
    type,
    quality,
  });

  const data = await getUrlForDownloadVideo({
    ...formatsData,
    id,
    type,
    quality,
    serverUrl,
    convertEndpoint: clientTokenData.convertEndpoint,
  });

  return { ...data, title: formatsData.title };
};
