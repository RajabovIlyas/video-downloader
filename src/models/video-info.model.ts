import { videoFormat } from "ytdl-core";

export type VideoFormat = Pick<
  videoFormat,
  "quality" | "qualityLabel" | "itag" | "fps" | "contentLength" | "url"
>;

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
};
