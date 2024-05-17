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
  const { formats, videoDetails, ...otherData } = await getBasicInfo(url);
  return {
    title: videoDetails.title,
    pictures: videoDetails.thumbnails,
    formats: Object.values(
      formats
        .filter(({ mimeType }) => mimeType && mimeType.search(/video.+/) >= 0)
        .map((format) => objectDivision(format, FORMAT_PROPERTIES))
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
