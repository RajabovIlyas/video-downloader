import { TypeTags } from "@/enums/type-tags.enum";
import { videoFormat } from "ytdl-core";

export type VideoFormat = Pick<
  videoFormat,
  "quality" | "qualityLabel" | "contentLength" | "url"
> & { type: TypeTags; url: string };

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
};
