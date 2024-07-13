"use server";

import { getUrlForScrapping } from "@/server/scrapping-format/scrapping-format.constant";
import axios from "axios";
import {
  getFormatsByHTML,
  getUserTokenByHTML,
} from "@/server/scrapping-format/scrapping-format.cheerio";
import { getFormatFetch } from "@/server/scrapping-format/scrapping-format.fetch";
import { formatConvert } from "@/server/scrapping-format/scrapping-format.convert";
import { VideoInfoModel } from "@/models/video-info.model";

export const getScrappingPage = async (videoId: string) => {
  const urlScrapping = getUrlForScrapping(videoId);
  const result = await axios.get(urlScrapping);

  const htmlString = result.data;

  return getUserTokenByHTML(htmlString);
};

export const getScrappingFormatFromBackEnd = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const clientTokenData = await getScrappingPage(videoId);

  const htmlFormatsString = await getFormatFetch({
    ...clientTokenData,
    videoId,
  });

  const formatsData = getFormatsByHTML(htmlFormatsString);

  return {
    title: formatsData.title,
    formats: formatsData.formats.map(formatConvert(formatsData)),
  };
};
