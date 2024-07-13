"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { getContentLength } from "@/helpers/content-length.helper";
import { TypeTags } from "@/enums/type-tags.enum";

import { captionTrack, getInfo, videoFormat } from "ytdl-core";

import { ResponseCaptionsModel } from "@/models/response-video-info.model";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = [
  "quality",
  "qualityLabel",
  "url",
];

const fileSize = (contentLength: string | number) =>
  `${getBiteToMegaBite(contentLength)} mb`;

const getSizeFile = async (url?: string, contentLength?: string) => {
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

const convertedFormat = async (
  format: videoFormat,
  videoId: string,
): Promise<VideoFormat> => ({
  ...objectDivision(format, FORMAT_PROPERTIES),
  contentLength: await getSizeFile(format.url, format.contentLength),
  type: getType(format.itag, format.mimeType),
  url: getUrlDownload(videoId, format.itag),
});

const getSubtitle = async (
  videoKey: string,
  captions?: captionTrack[],
): Promise<Promise<VideoFormat>[]> => {
  try {
    if (!captions) {
      return [];
    }
    return captions.map(async ({ languageCode, baseUrl }) => ({
      quality: languageCode.toString(),
      qualityLabel: languageCode.toString(),
      type: TypeTags.subtitle,
      url: baseUrl, //`/api/captions?id=${videoKey}&lang=${languageCode}`,
      contentLength: await getSizeFile(baseUrl),
    }));
  } catch (e) {
    if (e instanceof Error) {
      console.log("error", e.message);
    }
    return [];
  }
};

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const {
    formats,
    videoDetails,
    player_response: { captions },
  } = await getInfo(videoId);

  const subTitles = captions
    ? await getSubtitle(
        videoId,
        captions?.playerCaptionsTracklistRenderer.captionTracks,
      )
    : [];

  const videoFormat = await Promise.all([
    ...formats.map(async (format) => convertedFormat(format, videoId)),
    ...subTitles,
  ]);

  return {
    formats: videoFormat,
    title: videoDetails.title,
  };
};
