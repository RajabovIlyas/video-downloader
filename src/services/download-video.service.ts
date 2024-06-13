"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { getContentLength } from "@/helpers/content-length.helper";
import { TypeTags } from "@/enums/type-tags.enum";
import axios from "axios";
import {
  ResponseVideoFormatModel,
  ResponseVideoInfoModel,
} from "@/models/response-video-info.model";

const FORMAT_PROPERTIES: Array<keyof ResponseVideoFormatModel> = [
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

const getVideoInfo = async (id: string): Promise<ResponseVideoInfoModel> => {
  return (
    await axios.post("https://www.youtube.com/youtubei/v1/player", {
      videoId: id,
      context: {
        client: { clientName: "WEB", clientVersion: "2.20230810.05.00" },
      },
    })
  ).data;
};

const convertedFormat = async (
  format: ResponseVideoFormatModel,
  videoId: string,
) => ({
  ...objectDivision(format, FORMAT_PROPERTIES),
  contentLength: await getSizeFile(format.url, format.contentLength),
  type: format.mimeType?.startsWith("audio") ? TypeTags.audio : TypeTags.video,
  url: getUrlDownload(videoId, format.itag),
});

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const {
    streamingData: { adaptiveFormats, formats },
    videoDetails,
  } = await getVideoInfo(videoId);

  const videoFormat = await Promise.all([
    ...formats.map(async (format) => ({
      ...(await convertedFormat(format, videoId)),
      type: TypeTags.videoFull,
    })),
    ...adaptiveFormats.map((format) => convertedFormat(format, videoId)),
  ]);

  return {
    formats: videoFormat,
    title: videoDetails.title,
  };
};
