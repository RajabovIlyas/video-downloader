import { TypeTags } from "@/enums/type-tags.enum";
import { videoFormat } from "ytdl-core";

export type VideoFormat = Pick<
  videoFormat,
  "quality" | "contentLength" | "url"
> & { type: TypeTags; url: string; qualityLabel: string };

export type VideoInfoModel = {
  formats: VideoFormat[];
  title: string;
};
