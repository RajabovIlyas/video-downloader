'use server'
import ytdl, {chooseFormat, downloadFromInfo, filterFormats, getBasicInfo, getInfo, videoFormat} from 'ytdl-core'
import {objectDivision} from "@/helpers/object-division.helper";
import {VideoFormatForView} from "@/models/video-format.model";
import * as fs from "fs";

const FORMAT_PROPERTIES: Array<keyof videoFormat> = ['quality', 'qualityLabel', 'url', 'itag']

export const getVideoInfoByUrl = async (url: string): Promise<VideoFormatForView[]> => {
    const {formats} = await getBasicInfo(url);
    return formats
        .filter(({mimeType}) => mimeType && mimeType.search(/video.+/) >= 0)
        .map((format) => objectDivision(format, FORMAT_PROPERTIES));
}

export const downloadVideo = async (quality: string, url: string) => {
    const info = await getInfo(url);
    const format = chooseFormat(info.formats, {quality});
    const fileName = `${info.videoDetails.title}(${format.qualityLabel}).${format.container}`
    const outputFilePath = `videos/${fileName}`;
    const outputStream = fs.createWriteStream(outputFilePath);
    ytdl.downloadFromInfo(info, {format: format}).pipe(outputStream);
    outputStream.on('finish', () => {
        console.log(`Finished downloading: ${outputFilePath}`);
    });
    return {fileName: fileName};
}
