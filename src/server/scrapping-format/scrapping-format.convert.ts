import {
  FormatFileType,
  FormatVideo,
  FormatVideoFromHTML,
} from "@/server/scrapping-format/scrapping-format.interface";
import { VideoFormat } from "@/models/video-info.model";
import { TypeTags } from "@/enums/type-tags.enum";

const TYPE = {
  [FormatFileType.mp3]: TypeTags.audio,
  [FormatFileType.ogg]: TypeTags.audio,
  [FormatFileType.mp4]: TypeTags.videoFull,
  [FormatFileType["3gp"]]: TypeTags.videoFull,
};

export const formatConvert =
  ({ videoId }: Omit<FormatVideoFromHTML, "formats">) =>
  ({ size, quality, videoFormat, type }: FormatVideo): VideoFormat => {
    return {
      contentLength: size,
      quality: quality,
      qualityLabel: videoFormat,
      type: TYPE[type],
      url: `/api/scrapping/download-check?id=${videoId}&type=${type}&quality=${quality}`,
    };
  };
