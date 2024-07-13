export enum FormatFileType {
  "mp3" = "mp3",
  "mp4" = "mp4",
  "ogg" = "ogg",
  "3gp" = "3gp",
}

export interface FormatVideo {
  videoFormat: string;
  size: string;
  quality: string;
  type: FormatFileType;
}

export interface FormatVideoFromHTML {
  title: string;
  formats: FormatVideo[];
  fileName: string;
  videoId: string;
  videoTime: string;
  videoToken: string;
  convertUrl: string;
  prefixName: string;
}
