"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { getInfo, videoFormat } from "ytdl-core";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = [
  "quality",
  "qualityLabel",
  "itag",
  "fps",
  "url",
];

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const { formats, videoDetails } = await getInfo(videoId);

  const videoFormat: VideoFormat[] = Object.values(
    [...formats]
      .filter(({ mimeType }) => mimeType && mimeType.search(/video.+/) >= 0)
      .map((format) => ({
        ...objectDivision(format, FORMAT_PROPERTIES),
        contentLength: format.contentLength
          ? `${getBiteToMegaBite(format.contentLength)} mb`
          : "unknown size",
      }))
      .reduce((acc, obj) => ({ ...acc, [obj.itag]: obj }), {}),
  );

  return {
    formats: videoFormat,
    title: videoDetails.title,
  };
};
