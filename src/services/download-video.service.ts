"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { getContentLength } from "@/helpers/content-length.helper";
import { TypeTags } from "@/enums/type-tags.enum";
import axios from "axios";
import { ResponseVideoInfoModel } from "@/models/response-video-info.model";
import { getInfo, videoFormat } from "ytdl-core";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = [
  "quality",
  "qualityLabel",
  "url",
];

const fileSize = (contentLength: string | number) =>
  `${getBiteToMegaBite(contentLength)} mb`;

const getSizeFile = async (url: string, contentLength?: string) => {
  if (contentLength) {
    return fileSize(contentLength);
  }

  const newContentLength = await getContentLength(url);
  if (!newContentLength) {
    return "unknown size";
  }
  return fileSize(newContentLength);
};

const getUrlDownload = (videoKey: string, itag: number) => {
  if (!videoKey || !itag) {
    return "";
  }
  return `/api/videos?id=${videoKey}&quality=${itag}`;
};

const getType = (itag: number, mimeType?: string) => {
  if (itag < 100) {
    return TypeTags.videoFull;
  }
  return mimeType?.startsWith("video") ? TypeTags.video : TypeTags.audio;
};

const convertedFormat = async (format: videoFormat, videoId: string) => ({
  ...objectDivision(format, FORMAT_PROPERTIES),
  contentLength: await getSizeFile(format.url, format.contentLength),
  type: getType(format.itag, format.mimeType),
  url: getUrlDownload(videoId, format.itag),
});

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const { formats, videoDetails } = await getInfo(videoId);

  const videoFormat = await Promise.all(
    formats.map(async (format) => convertedFormat(format, videoId)),
  );

  return {
    formats: videoFormat,
    title: videoDetails.title,
  };
};
