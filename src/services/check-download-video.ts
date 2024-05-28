"use server";
import axios from "axios";
import { objectDivision } from "@/helpers/object-division.helper";
import { ResponseVideoFormat } from "@/models/response-video-info";
import { getBiteToMegaBite } from "@/helpers/bite-to-megabite.helper";
import { VideoFormat, VideoInfoModel } from "@/models/video-info.model";
import * as vm from "vm";

const FORMAT_PROPERTIES: Array<keyof ResponseVideoFormat> = [
  "quality",
  "qualityLabel",
  "itag",
  "fps",
  "contentLength",
];

const getVideoInfo = async (videoId: string) =>
  axios.post("https://www.youtube.com/youtubei/v1/player", {
    videoId: videoId,
    context: {
      client: { clientName: "WEB", clientVersion: "2.20230810.05.00" },
    },
  });

export const videoInfoById = async (
  videoId: string,
): Promise<VideoInfoModel> => {
  const response = await getVideoInfo(videoId);

  const formats: ResponseVideoFormat[] =
    response.data.streamingData.adaptiveFormats;
  const title: string = response.data.videoDetails.title;

  const videoFormat: VideoFormat[] = Object.values(
    formats
      .filter(
        ({ url, mimeType }) =>
          url && mimeType && mimeType.search(/video.+/) >= 0,
      )
      .map((format) => ({
        ...objectDivision(format, FORMAT_PROPERTIES),
        contentLength: `${getBiteToMegaBite(format.contentLength)} mb`,
      }))
      .reduce((acc, obj) => ({ ...acc, [obj.itag]: obj }), {}),
  );

  console.log("formats", videoFormat, title);

  return {
    formats: videoFormat,
    title,
  };
};

export async function retrieveChallenge(video_id: string) {
  /**
   * Находим URL файла javascript для актуальной версии плеера
   */
  async function retrievePlayerUrl(video_id: string) {
    const response = await axios.get(
      "https://www.youtube.com/embed/" + video_id,
    );
    const reqExpPlayerHash =
      /\/s\/player\/(\w+)\/player_ias.vflset\/\w+\/base.js/;
    const playerHash = reqExpPlayerHash.exec(response.data)?.[1];

    return `https://www.youtube.com/s/player/${playerHash}/player_ias.vflset/en_US/base.js`;
  }

  const playerUrl = await retrievePlayerUrl(video_id);

  const response = await axios.get(playerUrl);

  const reqExpChallengeName =
    /\.get\("n"\)\)&&\(b=([a-zA-Z0-9$]+)(?:\[(\d+)\])?\([a-zA-Z0-9]\)/;

  const challengeName = reqExpChallengeName.exec(response.data)?.[1];

  const challengeNameNew = new RegExp(
    `var ${challengeName}\\s*=\\s*\\[(.+?)\\]\\s*[,;]`,
  ).exec(response.data)?.[1];

  return new RegExp(
    `${challengeNameNew}\\s*=\\s*function\\s*\\(([\\w$]+)\\)\\s*{(.+?}\\s*return\\ [\\w$]+.join\\(""\\))};`,
    "s",
  ).exec(response.data)?.[2];
}

export async function solveChallenge(challenge: string, formatUrl: string) {
  const url = new URL(formatUrl);

  const n = url.searchParams.get("n");
  const nTransformed = vm.runInNewContext(`((a) => {${challenge}})('${n}')`);

  url.searchParams.set("n", nTransformed);

  console.log("url", url.toString());
  return url.toString();
}
