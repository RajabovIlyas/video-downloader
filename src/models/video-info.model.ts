import { ResponseVideoFormat } from "@/models/response-video-info";

export type VideoFormat = Pick<
  ResponseVideoFormat,
  "quality" | "qualityLabel" | "itag" | "fps" | "contentLength" | "url"
>;

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
};
