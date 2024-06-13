import { TypeTags } from "@/enums/type-tags.enum";
import { ResponseVideoFormatModel } from "@/models/response-video-info.model";

export type VideoFormat = Pick<
  ResponseVideoFormatModel,
  "quality" | "qualityLabel" | "contentLength" | "url"
> & { type: TypeTags; url: string };

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
};
