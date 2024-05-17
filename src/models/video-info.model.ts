import { videoFormat, thumbnail } from "ytdl-core";

export type VideoFormat = Pick<
  videoFormat,
  "quality" | "qualityLabel" | "url" | "itag" | "fps"
>;

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
  pictures: thumbnail[];
};
