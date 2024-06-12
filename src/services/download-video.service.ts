"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { getInfo, videoFormat } from "ytdl-core";
import axios from "axios";
import { getContentLength } from "@/helpers/content-length.helper";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = [
  "quality",
  "qualityLabel",
  "itag",
  "fps",
  "url",
  "container",
];

const getSizeFile = async (url: string) => {
  const contentLength = await getContentLength(url);
  if (!contentLength) {
    return "unknown size";
  }
  return `${getBiteToMegaBite(contentLength)} mb`;
};

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const { formats, videoDetails } = await getInfo(videoId);

  const videoFormat: VideoFormat[] = Object.values(
    formats
      .map((format) => ({
        ...objectDivision(format, FORMAT_PROPERTIES),
        contentLength: format.contentLength
          ? `${getBiteToMegaBite(format.contentLength)} mb`
          : getSizeFile(format.url),
      }))
      .reduce((acc, obj) => ({ ...acc, [obj.itag]: obj }), {}),
  );

  return {
    formats: videoFormat,
    title: videoDetails.title,
  };
};
