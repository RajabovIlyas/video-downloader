import {videoFormat} from "ytdl-core";

export type VideoFormatForView = Pick<videoFormat, 'quality'| 'qualityLabel'| 'url'| 'itag'>

