"use server";
import ytdl, {
  chooseFormat,
  downloadFromInfo,
  filterFormats,
  getBasicInfo,
  getInfo,
  videoFormat,
} from "ytdl-core";
import { objectDivision } from "@/helpers/object-division.helper";
import { VideoInfoModel } from "@/models/video-info.model";
import * as fs from "fs";
import { VIDEO_FOLDER } from "@/constants/video.constant";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = [
  "quality",
  "qualityLabel",
  "url",
  "itag",
  "fps",
];

export const getVideoInfoByUrl = async (
  url: string,
): Promise<VideoInfoModel> => {
  const { formats, videoDetails, ...otherData } = await getInfo(url);

  console.log("formats", formats);
  return {
    title: videoDetails.title,
    formats: Object.values(
      formats
        .filter(
          ({ mimeType, url }) =>
            url && mimeType && mimeType.search(/video.+/) >= 0,
        )
        .map((format) => ({
          ...objectDivision(format, FORMAT_PROPERTIES),
          contentLength: `${getBiteToMegaBite(format.contentLength)} mb`,
        }))
        .reduce((acc, obj) => ({ ...acc, [obj.itag]: obj }), {}),
    ),
  };
};

export const downloadVideo = async (quality: string, url: string) => {
  if (!fs.existsSync(VIDEO_FOLDER)) {
    fs.mkdirSync(VIDEO_FOLDER);
  }
  const info = await getInfo(url);
  const format = chooseFormat(info.formats, { quality });
  const fileName = `${info.videoDetails.title}(${format.qualityLabel}).${format.container}`;
  const outputFilePath = `videos/${fileName}`;
  const outputStream = fs.createWriteStream(outputFilePath);
  ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
  outputStream.on("finish", () => {
    console.log(`Finished downloading: ${outputFilePath}`);
  });
  return { fileName };
};
