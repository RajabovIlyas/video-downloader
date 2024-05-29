"use server";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { ResponseVideoFormat } from "@/models/response-video-info";
import axios from "axios";

const FORMAT_PROPERTIES: Array<keyof ResponseVideoFormat> = [
  "quality",
  "qualityLabel",
  "itag",
  "fps",
];

const getVideoInfo = async (videoId: string) =>
  axios.post("https://www.youtube.com/youtubei/v1/player", {
    videoId: videoId,
    context: {
      client: { clientName: "WEB", clientVersion: "2.20230810.05.00" },
    },
  });

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const response = await getVideoInfo(videoId);

  const formats: ResponseVideoFormat[] = [
    ...response.data.streamingData.formats,
    ...response.data.streamingData.adaptiveFormats,
  ];
  const title: string = response.data.videoDetails.title;

  const videoFormat: VideoFormat[] = Object.values(
    [...formats]
      .filter(
        ({ url, signatureCipher, mimeType }) =>
          mimeType && mimeType.search(/video.+/) >= 0,
      )
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
    title,
  };
};
